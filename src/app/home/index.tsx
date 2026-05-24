import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

import { QuoteView } from "../../components/QuoteView";
import { LayoutGridIcon } from "../../components/icons";
import { Colors } from "../../constants/colors";
import { useRandomQuote } from "../../hooks/useQuotes";
import { updateQuoteWidget } from "../../widgets/updateQuoteWidget";

export default function Home() {
  const router = useRouter();
  const { quote } = useRandomQuote();

  // Keep the home-screen widget(s) in sync with the current quote. iOS-only
  // and a silent no-op in binaries without Voltra (see updateQuoteWidget).
  useEffect(() => {
    if (Platform.OS !== "ios") return;
    updateQuoteWidget(quote.text, quote.author).catch(() => {});
  }, [quote.text, quote.author]);

  return (
    <QuoteView
      quote={quote}
      leftIcon={<LayoutGridIcon size={20} color={Colors.white} />}
      leftLabel="Topics"
      onLeftPress={() => router.navigate("/home/discover")}
    />
  );
}
