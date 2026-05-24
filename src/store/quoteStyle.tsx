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
import { DEFAULT_QUOTE_STYLE, type QuoteStyle } from "./quoteStyleConstants";

// Re-export pure constants/types so existing app imports keep working. The
// widget code imports the same things directly from quoteStyleConstants to
// avoid pulling AsyncStorage / react-native into the build-time prerender.
export {
  DEFAULT_QUOTE_STYLE,
  SWATCHES,
  THEME_WIDGET_ASSETS,
  sizeForSlider,
  type QuoteStyle,
} from "./quoteStyleConstants";

const KEY = "quoto.quoteStyle.v1";

/**
 * App-wide quote styling chosen on the Customize page and saved here. Applied
 * to the home/topic quote view and the shareable Download card so what the
 * user customises is what they see and share everywhere.
 *
 * Numeric indexes (instead of resolved values) keep the persisted shape stable
 * and small, and let Customize echo the same selection back when reopened.
 */

/**
 * Font families shown in Customize and applied to QuoteView /
 * DownloadableQuote. Lives here (not in the pure constants file) because it
 * imports `Fonts`, which depends on `react-native`'s Platform.select.
 */
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
 * append a parallel entry to both arrays — here and in
 * `THEME_WIDGET_ASSETS` (quoteStyleConstants.ts).
 */
export const THEMES: (ImageSourcePropType | null)[] = [
  null,
  require("../assets/images/backgrounds/bg-main.jpg"),
  require("../assets/images/backgrounds/theme-bg-1.jpg"),
  require("../assets/images/backgrounds/theme-bg-2.jpg"),
  require("../assets/images/backgrounds/theme-bg-3.jpg"),
];

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
