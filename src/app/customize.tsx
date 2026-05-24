import { useLocalSearchParams, useRouter } from "expo-router";
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
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

import { ModalHeader } from "../components/ModalHeader";
import { CheckCircleIcon } from "../components/icons";
import { Slider } from "../components/ui/Slider";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { getCurrentQuote } from "../services/quotePool";
import {
  FONTS,
  SWATCHES,
  sizeForSlider,
  useQuoteStyle,
} from "../store/quoteStyle";

const THEME_BG = require("../assets/images/backgrounds/bg-main.jpg");

const APPEARANCES = ["Dark Yellow", "Dark Blue"];
// First theme is the neutral (solid colour, driven by the swatch picker); the
// rest use the share-background image with a legibility gradient.
const THEMES: (number | null)[] = [null, THEME_BG, THEME_BG, THEME_BG];

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
  const router = useRouter();
  const { style, save } = useQuoteStyle();

  // Quote to preview comes from wherever the user opened customise from
  // (home, topic, download); falls back to the pool's current quote so the
  // page is still meaningful if entered directly.
  const params = useLocalSearchParams<{ text?: string; author?: string }>();
  const current = getCurrentQuote();
  const quote = {
    text: params.text ?? current.text,
    author: params.author ?? current.author,
  };

  // Seed local state from the saved style so reopening reflects the current
  // selection; Save commits the local state back to the store.
  const [appearance, setAppearance] = useState(0);
  const [theme, setTheme] = useState(style.theme);
  const [color, setColor] = useState(style.color);
  const [font, setFont] = useState(style.font);
  const [fontSize, setFontSize] = useState(style.fontSize);

  const fontFamily = FONTS[font].family;
  const quoteSize = sizeForSlider(fontSize);
  const themeImage = THEMES[theme];
  const solidBg = SWATCHES[color];

  const handleSave = () => {
    save({ theme, color, font, fontSize });
    router.back();
  };

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
        <View style={styles.previewWrap}>
          <View
            style={[styles.card, !themeImage && { backgroundColor: solidBg }]}
          >
            {themeImage ? (
              <>
                <Image
                  source={themeImage}
                  style={styles.fill}
                  resizeMode="cover"
                />
                <Svg style={styles.fill}>
                  <Defs>
                    <LinearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#000000" stopOpacity="0.5" />
                      <Stop
                        offset="0.45"
                        stopColor="#000000"
                        stopOpacity="0.4"
                      />
                      <Stop offset="1" stopColor="#000000" stopOpacity="0.8" />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#shade)"
                  />
                </Svg>
              </>
            ) : null}

            <View style={styles.cardContent}>
              <Text style={styles.mark}>“</Text>
              <Text
                style={[
                  styles.quote,
                  {
                    fontFamily,
                    fontSize: quoteSize,
                    lineHeight: quoteSize * 1.4,
                  },
                ]}
              >
                {quote.text}
              </Text>
              <Text style={[styles.author, { fontFamily }]}>
                - {quote.author} -
              </Text>
            </View>

            <Text style={styles.watermark}>Quoto</Text>
          </View>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </View>

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
                style={[styles.themeCard, !bg && { backgroundColor: solidBg }]}
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
  // Live preview
  previewWrap: {
    alignItems: "center",
    gap: 16,
  },
  card: {
    width: 300,
    height: 420,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.background,
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 56,
    gap: 12,
  },
  mark: {
    fontFamily: Fonts.inter.bold,
    fontSize: 56,
    lineHeight: 56,
    color: Colors.brand,
  },
  quote: {
    textAlign: "center",
    color: Colors.white,
  },
  author: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.85)",
  },
  watermark: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: Fonts.inter.bold,
    fontSize: 13,
    letterSpacing: 2,
    color: "rgba(255, 255, 255, 0.8)",
  },
  saveButton: {
    width: 260,
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.black,
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
