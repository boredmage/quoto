import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "../components/ScreenHeader";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const OPTIONS = [
  "Help center",
  "Contact Support",
  "Privacy Policy",
  "Terms & Conditions",
];

export default function HelpCenter() {
  return (
    <View style={styles.root}>
      <ScreenHeader title="Help Center" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {OPTIONS.map((label) => (
            <Pressable key={label} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={Colors.white}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: "hidden",
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    height: 44,
  },
  label: {
    flex: 1,
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    color: Colors.white,
  },
});
