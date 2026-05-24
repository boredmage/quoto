import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Quote } from "../types/quote";
import { FALLBACK_QUOTES, fetchQuoteBatch } from "./quotes";

/**
 * A prefetched, persisted batch of quotes that the UI reads synchronously.
 *
 * - Hydrated during the splash screen so home/topic render with the first
 *   real quote — no per-screen loading flash.
 * - Persisted in AsyncStorage so the next launch is instant even before any
 *   network call resolves.
 * - Background-refills when the remaining quotes drop below LOW_WATER, so
 *   advancing through the pool stays seamless.
 *
 * The pool is a process-wide singleton; React components subscribe via
 * `useSyncExternalStore` (see `hooks/useQuotes`).
 */

const POOL_KEY = "quoto.pool.v1";
const POOL_TARGET = 50;
const LOW_WATER = 10;

let pool: Quote[] = [];
let index = 0;
let hydrated = false;
let refilling = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

async function persist() {
  try {
    await AsyncStorage.setItem(POOL_KEY, JSON.stringify({ pool, index }));
  } catch {
    // best-effort
  }
}

async function refill() {
  if (refilling) return;
  refilling = true;
  try {
    const fresh = await fetchQuoteBatch(POOL_TARGET);
    if (fresh.length > 0) {
      // Trim consumed entries, append fresh ones, dedupe.
      const remaining = pool.slice(index);
      const seen = new Set(remaining.map((q) => q.id));
      const merged = remaining.concat(fresh.filter((q) => !seen.has(q.id)));
      pool = merged;
      index = 0;
      void persist();
      notify();
    }
  } catch {
    // keep existing pool; UI continues with what it has
  } finally {
    refilling = false;
  }
}

/**
 * Read the persisted pool, fetching a fresh batch only if we don't have one
 * yet. Resolves once the pool has at least one usable quote (or the network
 * fails with no cache, in which case the bundled fallback covers the UI).
 *
 * Idempotent — safe to call from the splash flow or anywhere else.
 */
export async function hydrateQuotePool(): Promise<void> {
  if (hydrated) return;
  try {
    const raw = await AsyncStorage.getItem(POOL_KEY);
    if (raw) {
      const cached = JSON.parse(raw) as { pool?: Quote[]; index?: number };
      if (cached.pool && cached.pool.length > 0) {
        pool = cached.pool;
        index = Math.min(cached.index ?? 0, pool.length - 1);
        hydrated = true;
        notify();
        // Background-top-up if running low.
        if (pool.length - index <= LOW_WATER) void refill();
        return;
      }
    }
  } catch {
    // fall through to fetch
  }

  // No cache — fetch synchronously so the splash can finish with real content.
  try {
    const fresh = await fetchQuoteBatch(POOL_TARGET);
    if (fresh.length > 0) {
      pool = fresh;
      index = 0;
      await persist();
    }
  } catch {
    // network failed before first launch — UI uses FALLBACK_QUOTES
  }
  hydrated = true;
  notify();
}

export function getCurrentQuote(): Quote {
  return pool[index] ?? FALLBACK_QUOTES[0];
}

/** Stable per-topic quote: hash the topic into the pool so each topic feels
 *  consistent until the pool itself refreshes. */
export function getQuoteForTopic(topic: string): Quote {
  if (pool.length === 0) {
    return FALLBACK_QUOTES[Math.abs(hashCode(topic)) % FALLBACK_QUOTES.length];
  }
  return pool[Math.abs(hashCode(topic)) % pool.length];
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

/** Advance to the next quote and (if low) kick off a background refill. */
export function advanceQuote() {
  if (pool.length === 0) return;
  index = (index + 1) % pool.length;
  void persist();
  if (pool.length - index <= LOW_WATER) void refill();
  notify();
}

export function subscribeQuotePool(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
