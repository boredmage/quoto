import { Voltra, type WidgetVariants } from "voltra";

// The dark card from the Figma widget designs (Grayscale/Black). iOS rounds the
// widget corners for us, so the card just fills the family with this colour.
const CARD_BG = "#030401";
const QUOTE_COLOR = "#ffffff";
const AUTHOR_COLOR = "#888888";

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

// Plain builder (not a component) so each variant value is a Voltra element
// directly, which is what the widget renderer expects.
function quoteCard(text: string, author: string, s: CardSizing) {
  return (
    <Voltra.VStack
      layout="flex"
      style={{
        flex: 1,
        backgroundColor: CARD_BG,
        padding: s.padding,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Voltra.Text
        numberOfLines={s.numberOfLines}
        multilineTextAlignment="center"
        style={{
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
          color: AUTHOR_COLOR,
          fontSize: s.authorSize,
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        {`- ${author} -`}
      </Voltra.Text>
    </Voltra.VStack>
  );
}

/** Renders the quote for both registered families (medium + large). */
export function quoteWidgetVariants(
  text: string,
  author: string,
): WidgetVariants {
  return {
    systemMedium: quoteCard(text, author, MEDIUM),
    systemLarge: quoteCard(text, author, LARGE),
  };
}
