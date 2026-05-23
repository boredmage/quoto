import type { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Colors } from "../../constants/colors";
import { CheckIcon } from "../icons";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

export function Checkbox({ checked, onChange, children }: CheckboxProps) {
  return (
    <Pressable
      style={styles.row}
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View
        style={[styles.box, checked ? styles.boxChecked : styles.boxUnchecked]}
      >
        {checked && <CheckIcon size={14} color={Colors.black} />}
      </View>
      <View style={styles.label}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    backgroundColor: Colors.brand,
  },
  boxUnchecked: {
    borderWidth: 1.5,
    borderColor: Colors.textVariant,
  },
  label: {
    flex: 1,
  },
});
