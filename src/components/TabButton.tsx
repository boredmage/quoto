import type { TabTriggerSlotProps } from "expo-router/ui";
import { forwardRef, type ReactElement } from "react";
import { Pressable, StyleSheet, Text, type View } from "react-native";

import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

type IconComponent = (props: { size?: number; color?: string }) => ReactElement;

type TabButtonProps = TabTriggerSlotProps & {
  icon: IconComponent;
  label: string;
};

/** Custom bottom-tab button: icon + label, white when focused, grey otherwise. */
export const TabButton = forwardRef<View, TabButtonProps>(
  ({ icon: Icon, label, isFocused, ...props }, ref) => {
    const color = isFocused ? Colors.white : Colors.textVariant;
    return (
      <Pressable ref={ref} {...props} style={styles.tab}>
        <Icon size={24} color={color} />
        <Text style={[styles.label, { color }]}>{label}</Text>
      </Pressable>
    );
  },
);

TabButton.displayName = "TabButton";

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontFamily: Fonts.inter.medium,
    fontSize: 12,
    lineHeight: 12 * 1.4,
  },
});
