import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { ArrowLeftIcon } from "../icons";
import { ProgressBar } from "./ProgressBar";

type PersonalizeHeaderProps = {
  total: number;
  current: number;
  onBack: () => void;
  onSkip: () => void;
};

export function PersonalizeHeader({
  total,
  current,
  onBack,
  onSkip,
}: PersonalizeHeaderProps) {
  return (
    <View>
      <View style={styles.nav}>
        <Pressable onPress={onBack} hitSlop={12} accessibilityLabel="Go back">
          <ArrowLeftIcon size={24} color={Colors.white} />
        </Pressable>
        <Pressable onPress={onSkip} hitSlop={8} accessibilityLabel="Skip">
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
      </View>
      <View style={styles.progress}>
        <ProgressBar total={total} current={current} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  skip: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.white,
  },
  progress: {
    padding: 16,
  },
});
