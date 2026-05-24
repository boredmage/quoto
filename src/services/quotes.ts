import type { Quote } from "../types/quote";

// ZenQuotes (keyless). Swap via EXPO_PUBLIC_QUOTES_API if you ever self-host or
// move to a tag-aware provider.
const BASE_URL =
  process.env.EXPO_PUBLIC_QUOTES_API ?? "https://zenquotes.io/api";

/** Stable id from the quote text (djb2) so the same quote favourites/dedupes. */
export function quoteId(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = (h * 33) ^ text.charCodeAt(i);
  return "q" + (h >>> 0).toString(36);
}

export function makeQuote(text: string, author: string): Quote {
  return { id: quoteId(text), text, author };
}

/**
 * Bundled quotes shown when the API is unreachable (offline / rate-limited), so
 * the UI always has content. ZenQuotes limits keyless requests, so these also
 * cover the first paint before the network resolves.
 */
export const FALLBACK_QUOTES: Quote[] = [
  makeQuote(
    "Walking with a friend in the dark is better than walking alone in the light",
    "Helen Keller",
  ),
  makeQuote(
    "The only way to do great work is to love what you do.",
    "Steve Jobs",
  ),
  makeQuote(
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Winston Churchill",
  ),
  makeQuote("Believe you can and you're halfway there.", "Theodore Roosevelt"),
  makeQuote("It always seems impossible until it's done.", "Nelson Mandela"),
];

type ZenQuote = { q?: string; a?: string; h?: string };

async function zenFetch(path: string): Promise<Quote[]> {
  const res = await fetch(`${BASE_URL}/${path}`);
  if (!res.ok) throw new Error(`Quotes API HTTP ${res.status}`);
  const data: unknown = await res.json();
  // ZenQuotes returns an array; on rate-limit it returns a non-quote payload.
  if (!Array.isArray(data) || !(data[0] as ZenQuote)?.q) {
    throw new Error("Quotes API returned no quotes");
  }
  return (data as ZenQuote[])
    .filter((z): z is Required<Pick<ZenQuote, "q" | "a">> => !!z.q && !!z.a)
    .map((z) => makeQuote(z.q, z.a));
}

/** A random quote (home + daily). */
export async function fetchRandomQuote(): Promise<Quote> {
  const [quote] = await zenFetch("random");
  return quote;
}

/**
 * A quote for a topic. ZenQuotes' keyless API has no topic filtering, so this
 * returns a random quote — the topic is used only as the cache key / label.
 * A tag-aware provider (or a ZenQuotes key) would make this topic-specific.
 */
export async function fetchTopicQuote(_topic: string): Promise<Quote> {
  return fetchRandomQuote();
}
