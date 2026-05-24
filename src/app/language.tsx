import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "../components/ScreenHeader";
import { CheckIcon } from "../components/icons";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const LANGUAGES = [
  { name: "English", flag: "🇺🇸" },
  { name: "Uzbek", flag: "🇺🇿" },
  { name: "Russian", flag: "🇷🇺" },
  { name: "Turkish", flag: "🇹🇷" },
  { name: "Arabic", flag: "🇦🇪" },
  { name: "Chinese", flag: "🇨🇳" },
];

export default function Language() {
  const [selected, setSelected] = useState("English");

  return (
    <View style={styles.root}>
      <ScreenHeader title="Language" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((lang) => {
          const active = selected === lang.name;
          return (
            <Pressable
              key={lang.name}
              style={[styles.row, active && styles.rowActive]}
              onPress={() => setSelected(lang.name)}
            >
              <View style={styles.flag}>
                <Text style={styles.flagText}>{lang.flag}</Text>
              </View>
              <Text style={styles.name}>{lang.name}</Text>
              {active ? <CheckIcon size={20} color={Colors.brand} /> : null}
            </Pressable>
          );
        })}
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
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 64,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
    backgroundColor: Colors.surface,
  },
  rowActive: {
    borderColor: Colors.brand,
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.onSurface,
  },
  flagText: {
    fontSize: 30,
    lineHeight: 40,
  },
  name: {
    flex: 1,
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.white,
  },
});
