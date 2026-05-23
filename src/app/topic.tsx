import { useLocalSearchParams, useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

import { QuoteView } from "../components/QuoteView";
import { LayoutGridIcon } from "../components/icons";
import { CATEGORIES } from "../constants/categories";
import { Colors } from "../constants/colors";
import { CURRENT_QUOTE } from "../constants/quote";

export default function Topic() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name?: string }>();
  const category = CATEGORIES.find((c) => c.name === name);

  const icon = category ? (
    <Svg
      width={20}
      height={20}
      viewBox={category.viewBox ?? "0 0 24 24"}
      fill="none"
    >
      <Path
        d={category.path}
        stroke={Colors.white}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ) : (
    <LayoutGridIcon size={20} color={Colors.white} />
  );

  return (
    <QuoteView
      text={CURRENT_QUOTE.text}
      author={CURRENT_QUOTE.author}
      leftIcon={icon}
      leftLabel={name ?? "Topics"}
      onBack={() => router.back()}
      safeAreaBottom
    />
  );
}
