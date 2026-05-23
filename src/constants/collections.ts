export type Collection = {
  id: string;
  title: string;
  count: number;
};

export const COLLECTIONS: Collection[] = [
  { id: "best", title: "My best collection", count: 4 },
  { id: "motivational", title: "Motivational quotes", count: 3 },
  { id: "new", title: "New collectioon", count: 2 },
];
