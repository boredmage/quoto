import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const BG = require("../assets/images/backgrounds/bg-main.jpg");

type DownloadableQuoteProps = {
  text: string;
  author: string;
};

/** The quote rendered as a shareable/downloadable card (image bg + overlay). */
export function DownloadableQuote({ text, author }: DownloadableQuoteProps) {
  return (
    <View style={styles.card}>
      <Image source={BG} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.textWrap}>
        <Text style={styles.quote}>{text}</Text>
        <Text style={styles.author}>- {author} -</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    height: 360,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  textWrap: {
    width: 228,
    gap: 16,
    alignItems: "center",
  },
  quote: {
    fontFamily: Fonts.inter.medium,
    fontSize: 18,
    lineHeight: 18 * 1.4,
    textAlign: "center",
    color: Colors.text,
  },
  author: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    textAlign: "center",
    color: Colors.white,
  },
});
