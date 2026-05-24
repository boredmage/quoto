import { useQuery } from "@tanstack/react-query";

import {
  FALLBACK_QUOTES,
  fetchRandomQuote,
  fetchTopicQuote,
} from "../services/quotes";
import type { Quote } from "../types/quote";

function fallbackFor(seed: string): Quote {
  let h = 0;
  for (let i = 0; i < seed.length; i++)
    h = (h + seed.charCodeAt(i)) % FALLBACK_QUOTES.length;
  return FALLBACK_QUOTES[h];
}

/** Random quote for the home screen. Falls back to a bundled quote on error. */
export function useRandomQuote() {
  const query = useQuery({
    queryKey: ["quote", "random"],
    queryFn: fetchRandomQuote,
  });
  return {
    quote: query.data ?? FALLBACK_QUOTES[0],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

/**
 * Quote for a topic (cached per topic so revisiting renders instantly). Falls
 * back to a bundled quote on error.
 */
export function useTopicQuote(topic: string) {
  const query = useQuery({
    queryKey: ["quote", "topic", topic],
    queryFn: () => fetchTopicQuote(topic),
    enabled: topic.length > 0,
  });
  return {
    quote: query.data ?? fallbackFor(topic),
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
