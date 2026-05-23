import { useRouter } from "expo-router";

import { QuoteView } from "../../components/QuoteView";
import { LayoutGridIcon } from "../../components/icons";
import { Colors } from "../../constants/colors";
import { CURRENT_QUOTE } from "../../constants/quote";

export default function Home() {
  const router = useRouter();

  return (
    <QuoteView
      text={CURRENT_QUOTE.text}
      author={CURRENT_QUOTE.author}
      leftIcon={<LayoutGridIcon size={20} color={Colors.white} />}
      leftLabel="Topics"
      onLeftPress={() => router.navigate("/home/discover")}
    />
  );
}
