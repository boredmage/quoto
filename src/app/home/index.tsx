import { useRouter } from "expo-router";

import { QuoteView } from "../../components/QuoteView";
import { LayoutGridIcon } from "../../components/icons";
import { Colors } from "../../constants/colors";
import { useRandomQuote } from "../../hooks/useQuotes";
import { usePushQuoteWidget } from "../../widgets/usePushQuoteWidget";

export default function Home() {
  const router = useRouter();
  const { quote } = useRandomQuote();

  // Mirror the current quote + saved Customize style to any installed widget.
  usePushQuoteWidget(quote.text, quote.author);

  return (
    <QuoteView
      quote={quote}
      leftIcon={<LayoutGridIcon size={20} color={Colors.white} />}
      leftLabel="Topics"
      onLeftPress={() => router.navigate("/home/discover")}
    />
  );
}
