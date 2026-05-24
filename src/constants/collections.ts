import { makeQuote } from "../services/quotes";
import type { Quote } from "../types/quote";

export type { Quote };

export type Collection = {
  id: string;
  title: string;
  quotes: Quote[];
};

/** Initial collections seeded into the store on first launch. */
export const SEED_COLLECTIONS: Collection[] = [
  {
    id: "best",
    title: "My best collection",
    quotes: [
      makeQuote(
        "Happiness is found in doing, not merely possessing.",
        "Napoleon Hill",
      ),
      makeQuote(
        "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
        "Charles Darwin",
      ),
      makeQuote(
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "Winston Churchill",
      ),
      makeQuote(
        "The only way to do great work is to love what you do.",
        "Steve Jobs",
      ),
    ],
  },
  {
    id: "motivational",
    title: "Motivational quotes",
    quotes: [
      makeQuote(
        "The future belongs to those who believe in the beauty of their dreams.",
        "Eleanor Roosevelt",
      ),
      makeQuote(
        "It always seems impossible until it's done.",
        "Nelson Mandela",
      ),
      makeQuote(
        "Believe you can and you're halfway there.",
        "Theodore Roosevelt",
      ),
    ],
  },
  {
    id: "new",
    title: "New collectioon",
    quotes: [
      makeQuote("Whatever you are, be a good one.", "Abraham Lincoln"),
      makeQuote(
        "Do what you can, with what you have, where you are.",
        "Theodore Roosevelt",
      ),
    ],
  },
];
