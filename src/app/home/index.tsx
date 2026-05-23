import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  DownloadIcon,
  FilePlusIcon,
  HeartIcon,
  LayoutGridIcon,
  PaletteIcon,
} from "../../components/icons";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

const BG = require("../../assets/images/backgrounds/bg-main.jpg");

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Image source={BG} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />

      <View style={[styles.body, { paddingTop: insets.top }]}>
        <View style={styles.content}>
          <View style={styles.quote}>
            <View style={styles.textBlock}>
              <Text style={styles.quoteText}>
                Walking with a friend in the dark is better than walking alone
                in the light
              </Text>
              <Text style={styles.author}>- Helen Keller -</Text>
            </View>

            <View style={styles.actions}>
              <Pressable hitSlop={8}>
                <DownloadIcon size={24} color={Colors.white} />
              </Pressable>
              <Pressable hitSlop={8}>
                <HeartIcon size={24} color={Colors.white} />
              </Pressable>
              <Pressable hitSlop={8}>
                <FilePlusIcon size={24} color={Colors.white} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Pressable style={styles.topics}>
            <LayoutGridIcon size={20} color={Colors.white} />
            <Text style={styles.topicsText}>Topics</Text>
          </Pressable>
          <Pressable style={styles.iconButton}>
            <PaletteIcon size={24} color={Colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
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
    backgroundColor: "rgba(0, 0, 0, 0.72)",
  },
  body: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  quote: {
    gap: 96,
    alignItems: "center",
  },
  textBlock: {
    gap: 16,
    alignItems: "center",
  },
  quoteText: {
    fontFamily: Fonts.inter.regular,
    fontSize: 24,
    lineHeight: 24 * 1.4,
    textAlign: "center",
    color: Colors.text,
  },
  author: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    textAlign: "center",
    color: Colors.white,
  },
  actions: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topics: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Colors.surface,
  },
  topicsText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.white,
  },
  iconButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.surface,
  },
});
