import { useSyncExternalStore } from "react";

import {
  advanceQuote,
  getCurrentQuote,
  getQuoteForTopic,
  subscribeQuotePool,
} from "../services/quotePool";

/**
 * The current quote, read synchronously from the prefetched pool (hydrated
 * during the splash). Re-renders when the pool advances or refills.
 */
export function useRandomQuote() {
  const quote = useSyncExternalStore(
    subscribeQuotePool,
    getCurrentQuote,
    getCurrentQuote,
  );
  return { quote, next: advanceQuote };
}

/**
 * A stable quote for a topic, hashed into the pool. Same topic → same quote
 * until the pool refills. Synchronous (no loading state).
 */
export function useTopicQuote(topic: string) {
  const getSnapshot = () => getQuoteForTopic(topic);
  const quote = useSyncExternalStore(
    subscribeQuotePool,
    getSnapshot,
    getSnapshot,
  );
  return { quote };
}
