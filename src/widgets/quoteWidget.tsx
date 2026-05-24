import { Voltra, type WidgetVariants } from "voltra";

import {
  DEFAULT_QUOTE_STYLE,
  SWATCHES,
  THEME_WIDGET_ASSETS,
  type QuoteStyle,
} from "../store/quoteStyle";

const QUOTE_COLOR = "#ffffff";
const AUTHOR_COLOR = "rgba(255, 255, 255, 0.85)";
// Dark legibility overlay laid over the theme image; matches the share card.
const OVERLAY_BG = "rgba(0, 0, 0, 0.55)";
// Fallback when style.theme = 0 and no swatch colour is supplied.
const NEUTRAL_BG = "#030401";

type CardSizing = {
  padding: number;
  quoteSize: number;
  quoteLineHeight: number;
  authorSize: number;
  numberOfLines: number;
};

// systemMedium is the wide 350×164 card; systemLarge is the 328×328 square.
const MEDIUM: CardSizing = {
  padding: 16,
  quoteSize: 16,
  quoteLineHeight: 22,
  authorSize: 12,
  numberOfLines: 4,
};
const LARGE: CardSizing = {
  padding: 24,
  quoteSize: 22,
  quoteLineHeight: 30,
  authorSize: 14,
  numberOfLines: 7,
};

/**
 * One widget card. Renders the user's saved background (image with a dark
 * legibility overlay, or the solid swatch colour for theme 0) under a flex
 * column of centered text.
 *
 * Wrapping note: `width: "100%"` on each Text is what actually forces
 * multiline behaviour. Voltra's flex column doesn't always stretch SwiftUI
 * Text to the parent width, so without an explicit width the text takes its
 * intrinsic single-line content width and runs out of the card.
 */
function quoteCard(
  text: string,
  author: string,
  style: QuoteStyle,
  s: CardSizing,
) {
  const assetName = THEME_WIDGET_ASSETS[style.theme] ?? null;
  const solidBg = SWATCHES[style.color] ?? NEUTRAL_BG;

  return (
    <Voltra.ZStack style={{ flex: 1 }}>
      {assetName ? (
        <>
          <Voltra.Image
            source={{ assetName }}
            resizeMode="cover"
            style={{ flex: 1, width: "100%", height: "100%" }}
          />
          <Voltra.VStack
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: OVERLAY_BG,
            }}
          />
        </>
      ) : (
        <Voltra.VStack
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: solidBg,
          }}
        />
      )}

      <Voltra.VStack
        layout="flex"
        style={{
          flex: 1,
          padding: s.padding,
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Voltra.Text
          numberOfLines={s.numberOfLines}
          multilineTextAlignment="center"
          style={{
            width: "100%",
            color: QUOTE_COLOR,
            fontSize: s.quoteSize,
            fontWeight: "600",
            lineHeight: s.quoteLineHeight,
            textAlign: "center",
          }}
        >
          {text}
        </Voltra.Text>
        <Voltra.Text
          multilineTextAlignment="center"
          style={{
            width: "100%",
            color: AUTHOR_COLOR,
            fontSize: s.authorSize,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {`- ${author} -`}
        </Voltra.Text>
      </Voltra.VStack>
    </Voltra.ZStack>
  );
}

/**
 * Renders the quote for both registered families (medium + large) using the
 * user's saved style. Falls back to DEFAULT_QUOTE_STYLE when called without
 * one (e.g. from the build-time initial state file).
 */
export function quoteWidgetVariants(
  text: string,
  author: string,
  style: QuoteStyle = DEFAULT_QUOTE_STYLE,
): WidgetVariants {
  return {
    systemMedium: quoteCard(text, author, style, MEDIUM),
    systemLarge: quoteCard(text, author, style, LARGE),
  };
}
