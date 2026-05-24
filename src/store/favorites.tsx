import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Quote } from "../types/quote";

const KEY = "quoto.favorites.v1";

type FavoritesContextValue = {
  favorites: Quote[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (quote: Quote) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) setFavorites(JSON.parse(raw) as Quote[]);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded)
      AsyncStorage.setItem(KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  const isFavorite = (id: string) => favorites.some((q) => q.id === id);

  const toggleFavorite = (quote: Quote) =>
    setFavorites((prev) =>
      prev.some((q) => q.id === quote.id)
        ? prev.filter((q) => q.id !== quote.id)
        : [quote, ...prev],
    );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
