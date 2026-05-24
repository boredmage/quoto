import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "../components/ScreenHeader";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const THEMES = ["Dark Yellow", "Dark Blue"];

export default function Appearance() {
  const [theme, setTheme] = useState("Dark Yellow");

  return (
    <View style={styles.root}>
      <ScreenHeader title="Appearance" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.row}>
          {THEMES.map((name) => (
            <Pressable
              key={name}
              style={[styles.card, theme === name && styles.cardActive]}
              onPress={() => setTheme(name)}
            >
              <View style={styles.abstract}>
                <View style={styles.barShort} />
                <View style={styles.barLong} />
              </View>
              <Text style={styles.label}>{name}</Text>
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
  row: {
    flexDirection: "row",
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
    padding: 12,
    gap: 16,
    overflow: "hidden",
  },
  cardActive: {
    borderColor: Colors.brand,
  },
  abstract: {
    gap: 4,
  },
  barShort: {
    width: 88,
    maxWidth: "75%",
    height: 16,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  barLong: {
    width: 118,
    maxWidth: "100%",
    height: 16,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
  label: {
    fontFamily: Fonts.inter.medium,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.white,
  },
});
