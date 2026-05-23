import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Fonts } from "../constants/fonts";

export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 bg-[#0f0f0f] px-6 justify-center"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <StatusBar style="light" />
      <Text
        style={{ fontFamily: Fonts.monaSans.bold }}
        className="text-3xl text-[#f6f6f6]"
      >
        You're all set 🎉
      </Text>
      <Text
        style={{ fontFamily: Fonts.inter.regular }}
        className="mt-3 text-base text-[#888888]"
      >
        Onboarding complete. This is a placeholder home screen — replace it with
        the real app.
      </Text>
    </View>
  );
}
