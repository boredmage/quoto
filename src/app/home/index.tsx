import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

import { QuoteView } from "../../components/QuoteView";
import { LayoutGridIcon } from "../../components/icons";
import { Colors } from "../../constants/colors";
import { CURRENT_QUOTE } from "../../constants/quote";
import { updateQuoteWidget } from "../../widgets/updateQuoteWidget";
import { useRandomQuote } from "../../hooks/useQuotes";

export default function Home() {
  const router = useRouter();
  const { quote } = useRandomQuote();

  // Keep the home-screen widget(s) in sync with the current quote. Voltra is
  // iOS-only and a no-op without a native build, so guard and swallow errors.
  useEffect(() => {
    if (Platform.OS !== "ios") return;
    updateQuoteWidget(CURRENT_QUOTE.text, CURRENT_QUOTE.author).catch(() => {});
  }, []);

  return (
    <QuoteView
      quote={quote}
      leftIcon={<LayoutGridIcon size={20} color={Colors.white} />}
      leftLabel="Topics"
      onLeftPress={() => router.navigate("/home/discover")}
    />
  );
}
