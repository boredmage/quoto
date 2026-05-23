import { StyleSheet, View } from "react-native";

import { Colors } from "../../constants/colors";
import { CheckIcon } from "../icons";

/** Single-select radio indicator: brand circle + check when selected. */
export function Radio({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.base, selected ? styles.on : styles.off]}>
      {selected && <CheckIcon size={14} color={Colors.white} />}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  on: {
    backgroundColor: Colors.brand,
  },
  off: {
    borderWidth: 2,
    borderColor: Colors.dotInactive,
  },
});
