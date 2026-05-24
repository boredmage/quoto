import { Image, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const BG = require("../assets/images/backgrounds/bg-main.jpg");

type DownloadableQuoteProps = {
  text: string;
  author: string;
};

/**
 * The quote rendered as a polished, shareable card: background image with a
 * legibility gradient, a brand quote mark, the quote + author, and a "Quoto"
 * watermark. Captured as a PNG by the download screen.
 */
export function DownloadableQuote({ text, author }: DownloadableQuoteProps) {
  return (
    <View style={styles.card}>
      <Image source={BG} style={styles.fill} resizeMode="cover" />

      <Svg style={styles.fill}>
        <Defs>
          <LinearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#000000" stopOpacity="0.5" />
            <Stop offset="0.45" stopColor="#000000" stopOpacity="0.4" />
            <Stop offset="1" stopColor="#000000" stopOpacity="0.8" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#shade)" />
      </Svg>

      <View style={styles.content}>
        <Text style={styles.mark}>“</Text>
        <Text style={styles.quote}>{text}</Text>
        <Text style={styles.author}>- {author} -</Text>
      </View>

      <Text style={styles.watermark}>Quoto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 420,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.background,
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
  content: {
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
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    textAlign: "center",
    color: Colors.white,
  },
  author: {
    fontFamily: Fonts.inter.medium,
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
});
