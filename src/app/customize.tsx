import { StatusBar } from "expo-status-bar";
import { useState, type ReactNode } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ModalHeader } from "../components/ModalHeader";
import { CheckCircleIcon } from "../components/icons";
import { Slider } from "../components/ui/Slider";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const THEME_BG = require("../assets/images/backgrounds/bg-main.jpg");

const APPEARANCES = ["Dark Yellow", "Dark Blue"];
const SWATCHES = ["#000000", "#279e76", "#235183", "#796de2", "#822470"];
const FONTS = [
  { label: "Abcde", family: Fonts.inter.semibold },
  { label: "Abcde", family: Fonts.monaSans.bold },
  { label: "Abcde", family: Fonts.urbanist.bold },
];
// First theme is the neutral (solid) card; the rest use an image background.
const THEMES = [null, THEME_BG, THEME_BG, THEME_BG];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function Customize() {
  const insets = useSafeAreaInsets();
  const [appearance, setAppearance] = useState(0);
  const [theme, setTheme] = useState(0);
  const [color, setColor] = useState(0);
  const [font, setFont] = useState(0);
  const [fontSize, setFontSize] = useState(50);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <ModalHeader title="Customize" />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Section title="Appearance">
          <View style={styles.appearanceRow}>
            {APPEARANCES.map((label, i) => (
              <Pressable
                key={label}
                onPress={() => setAppearance(i)}
                style={[
                  styles.appearanceCard,
                  appearance === i && styles.cardSelected,
                ]}
              >
                <View style={styles.abstract}>
                  <View
                    style={[
                      styles.bar,
                      { width: 88, backgroundColor: "rgba(255,255,255,0.08)" },
                    ]}
                  />
                  <View
                    style={[
                      styles.bar,
                      { width: 118, backgroundColor: "rgba(255,255,255,0.16)" },
                    ]}
                  />
                </View>
                <Text style={styles.appearanceLabel}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </Section>

        <Section title="Themes">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          >
            {THEMES.map((bg, i) => (
              <Pressable
                key={i}
                onPress={() => setTheme(i)}
                style={styles.themeCard}
              >
                {bg ? (
                  <>
                    <Image source={bg} style={styles.fill} resizeMode="cover" />
                    <View style={styles.themeOverlay} />
                  </>
                ) : null}
                <Text style={styles.themeText}>Quoto</Text>
                {theme === i && (
                  <View style={styles.themeCheck}>
                    <CheckCircleIcon size={20} color={Colors.white} />
                  </View>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </Section>

        <Section title="Background color">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          >
            {SWATCHES.map((c, i) => (
              <Pressable
                key={c}
                onPress={() => setColor(i)}
                style={[styles.swatch, { backgroundColor: c }]}
              >
                {color === i && (
                  <CheckCircleIcon size={20} color={Colors.white} />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </Section>

        <Section title="Font Family">
          <View style={styles.fontRow}>
            {FONTS.map((f, i) => (
              <Pressable
                key={i}
                onPress={() => setFont(i)}
                style={[
                  styles.fontChip,
                  font === i ? styles.fontChipOn : styles.fontChipOff,
                ]}
              >
                <Text
                  style={{
                    fontFamily: f.family,
                    fontSize: 20,
                    color: font === i ? Colors.black : Colors.text,
                  }}
                >
                  {f.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Section>

        <Section title="Font size">
          <View style={styles.sliderCard}>
            <Slider
              value={fontSize}
              minimumValue={0}
              maximumValue={100}
              step={1}
              onValueChange={setFontSize}
            />
          </View>
        </Section>
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
    paddingVertical: 24,
    gap: 24,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: Colors.white,
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  hList: {
    gap: 16,
    paddingRight: 16,
  },
  // Appearance
  appearanceRow: {
    flexDirection: "row",
    gap: 16,
  },
  appearanceCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 16,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: Colors.brand,
  },
  abstract: {
    gap: 4,
  },
  bar: {
    height: 16,
    borderRadius: 4,
    maxWidth: "100%",
  },
  appearanceLabel: {
    fontFamily: Fonts.inter.medium,
    fontSize: 12,
    color: Colors.white,
  },
  // Themes
  themeCard: {
    width: 112,
    height: 168,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  themeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  themeText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 18,
    color: Colors.text,
  },
  themeCheck: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  // Colors
  swatch: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  // Font family
  fontRow: {
    flexDirection: "row",
    gap: 16,
  },
  fontChip: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  fontChipOn: {
    backgroundColor: Colors.white,
  },
  fontChipOff: {
    backgroundColor: Colors.surface,
  },
  // Font size
  sliderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
