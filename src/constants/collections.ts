export type Quote = { text: string; author: string };

export type Collection = {
  id: string;
  title: string;
  quotes: Quote[];
};

export const COLLECTIONS: Collection[] = [
  {
    id: "best",
    title: "My best collection",
    quotes: [
      {
        text: "Happiness is found in doing, not merely possessing.",
        author: "Napoleon Hill",
      },
      {
        text: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
        author: "Charles Darwin",
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
      },
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },
    ],
  },
  {
    id: "motivational",
    title: "Motivational quotes",
    quotes: [
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
      },
      {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela",
      },
      {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
      },
    ],
  },
  {
    id: "new",
    title: "New collectioon",
    quotes: [
      {
        text: "Whatever you are, be a good one.",
        author: "Abraham Lincoln",
      },
      {
        text: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt",
      },
    ],
  },
];
