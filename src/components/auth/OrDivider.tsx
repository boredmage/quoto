import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

export function OrDivider() {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.label}>OR</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#3a3a3a",
  },
  label: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    color: Colors.textVariant,
  },
});
