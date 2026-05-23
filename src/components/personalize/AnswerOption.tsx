import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { CheckIcon } from "../icons";

type AnswerOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function AnswerOption({ label, selected, onPress }: AnswerOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.option, selected && styles.selected]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <Text style={styles.label}>{label}</Text>
      {selected && <CheckIcon size={20} color={Colors.white} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    // transparent border keeps height stable between states
    borderWidth: 2,
    borderColor: "transparent",
  },
  selected: {
    borderColor: Colors.brand,
  },
  label: {
    flex: 1,
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.white,
  },
});
