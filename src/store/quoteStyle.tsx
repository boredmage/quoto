import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ImageSourcePropType } from "react-native";

import { Fonts } from "../constants/fonts";

const KEY = "quoto.quoteStyle.v1";

/**
 * App-wide quote styling chosen on the Customize page and saved here. Applied
 * to the home/topic quote view and the shareable Download card so what the
 * user customises is what they see and share everywhere.
 *
 * Numeric indexes (instead of resolved values) keep the persisted shape stable
 * and small, and let Customize echo the same selection back when reopened.
 */
export type QuoteStyle = {
  /** 0 = solid colour (driven by `color`), 1+ = image themes (index into THEMES) */
  theme: number;
  /** Index into SWATCHES (used when theme = 0) */
  color: number;
  /** Index into FONTS */
  font: number;
  /** Slider 0–100; mapped to point size by sizeForSlider */
  fontSize: number;
};

export const SWATCHES = ["#0f0f0f", "#279e76", "#235183", "#796de2", "#822470"];

export const FONTS = [
  { label: "Abcde", family: Fonts.inter.semibold },
  { label: "Abcde", family: Fonts.monaSans.bold },
  { label: "Abcde", family: Fonts.urbanist.bold },
];

/**
 * Background themes shown in Customize and applied to QuoteView /
 * DownloadableQuote. Index 0 is the neutral solid (renders the chosen
 * SWATCHES colour, no image); the rest are background images.
 *
 * To add a theme: drop a JPG into both `src/assets/images/backgrounds/` (the
 * app bundle) AND `assets/voltra/` (the iOS widget extension bundle), then
 * append a parallel entry to both arrays below.
 */
export const THEMES: (ImageSourcePropType | null)[] = [
  null,
  require("../assets/images/backgrounds/bg-main.jpg"),
  require("../assets/images/backgrounds/theme-bg-1.jpg"),
  require("../assets/images/backgrounds/theme-bg-2.jpg"),
  require("../assets/images/backgrounds/theme-bg-3.jpg"),
];

/**
 * The same theme images as `THEMES`, but expressed as Voltra widget asset
 * names (files under `assets/voltra/`). Indexes line up with THEMES so the
 * widget renders the same picture the user picked in Customize.
 */
export const THEME_WIDGET_ASSETS: (string | null)[] = [
  null,
  "bg-main.jpg",
  "theme-bg-1.jpg",
  "theme-bg-2.jpg",
  "theme-bg-3.jpg",
];

const MIN_FONT = 14;
const MAX_FONT = 30;

/** Slider 0–100 → point size for the quote text. */
export function sizeForSlider(v: number): number {
  return Math.round(MIN_FONT + (MAX_FONT - MIN_FONT) * (v / 100));
}

export const DEFAULT_QUOTE_STYLE: QuoteStyle = {
  theme: 1, // image theme — matches today's home/share look
  color: 0,
  font: 0,
  fontSize: 50,
};

type QuoteStyleContextValue = {
  style: QuoteStyle;
  save: (next: QuoteStyle) => void;
};

const QuoteStyleContext = createContext<QuoteStyleContextValue | null>(null);

export function QuoteStyleProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<QuoteStyle>(DEFAULT_QUOTE_STYLE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) setStyle({ ...DEFAULT_QUOTE_STYLE, ...JSON.parse(raw) });
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const save = (next: QuoteStyle) => {
    setStyle(next);
    if (loaded) AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
  };

  return (
    <QuoteStyleContext.Provider value={{ style, save }}>
      {children}
    </QuoteStyleContext.Provider>
  );
}

export function useQuoteStyle() {
  const ctx = useContext(QuoteStyleContext);
  if (!ctx)
    throw new Error("useQuoteStyle must be used within a QuoteStyleProvider");
  return ctx;
}
