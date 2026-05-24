/**
 * Pure constants and types for the quote style. Lives in its own file so the
 * widget's build-time prerender (which Babel-transpiles the dependency graph
 * in a Node VM) doesn't have to load `react-native` / AsyncStorage. The
 * runtime Provider in quoteStyle.tsx re-exports everything from here.
 */

export type QuoteStyle = {
  /** 0 = solid colour (driven by `color`), 1+ = image themes (index into THEMES / THEME_WIDGET_ASSETS) */
  theme: number;
  /** Index into SWATCHES (used when theme = 0) */
  color: number;
  /** Index into FONTS */
  font: number;
  /** Slider 0–100; mapped to point size by sizeForSlider */
  fontSize: number;
};

export const SWATCHES = ["#0f0f0f", "#279e76", "#235183", "#796de2", "#822470"];

/**
 * Widget extension asset names (files under `assets/voltra/`). Indexes line
 * up with THEMES (in quoteStyle.tsx) so the widget renders the same picture
 * the user picked in Customize. Theme 0 is null = solid colour.
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
