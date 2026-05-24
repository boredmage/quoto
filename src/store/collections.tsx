import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { SEED_COLLECTIONS, type Collection } from "../constants/collections";
import type { Quote } from "../types/quote";

const KEY = "quoto.collections.v1";

type CollectionsContextValue = {
  collections: Collection[];
  getCollection: (id: string) => Collection | undefined;
  createCollection: (title: string) => void;
  addToCollection: (collectionId: string, quote: Quote) => void;
  removeFromCollection: (collectionId: string, quoteId: string) => void;
};

const CollectionsContext = createContext<CollectionsContextValue | null>(null);

export function CollectionsProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] =
    useState<Collection[]>(SEED_COLLECTIONS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) setCollections(JSON.parse(raw) as Collection[]);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded)
      AsyncStorage.setItem(KEY, JSON.stringify(collections)).catch(() => {});
  }, [collections, loaded]);

  const getCollection = (id: string) => collections.find((c) => c.id === id);

  const createCollection = (title: string) =>
    setCollections((prev) => [
      ...prev,
      { id: `c${Date.now().toString(36)}`, title, quotes: [] },
    ]);

  const addToCollection = (collectionId: string, quote: Quote) =>
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId && !c.quotes.some((q) => q.id === quote.id)
          ? { ...c, quotes: [quote, ...c.quotes] }
          : c,
      ),
    );

  const removeFromCollection = (collectionId: string, quoteId: string) =>
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, quotes: c.quotes.filter((q) => q.id !== quoteId) }
          : c,
      ),
    );

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        getCollection,
        createCollection,
        addToCollection,
        removeFromCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const ctx = useContext(CollectionsContext);
  if (!ctx)
    throw new Error("useCollections must be used within a CollectionsProvider");
  return ctx;
}
