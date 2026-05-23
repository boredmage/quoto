import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

export default function Discover() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <Text style={styles.title}>Discover</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    color: Colors.text,
  },
});
