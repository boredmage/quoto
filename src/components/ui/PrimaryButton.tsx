import { Pressable, StyleSheet, Text, type ViewStyle } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function PrimaryButton({ title, onPress, style }: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.9,
  },
  text: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    color: Colors.black,
  },
});
