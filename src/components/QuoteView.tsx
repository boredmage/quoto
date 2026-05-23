import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, type ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import {
  ChevronLeftIcon,
  DownloadIcon,
  FilePlusIcon,
  HeartIcon,
  PaletteIcon,
} from "./icons";

const BG = require("../assets/images/backgrounds/bg-main.jpg");

type QuoteViewProps = {
  text: string;
  author: string;
  /** Icon shown in the bottom-left button (layout-grid on home, the topic icon on a topic). */
  leftIcon: ReactNode;
  /** Label for the bottom-left button (e.g. "Topics" or a topic name). */
  leftLabel: string;
  /** Optional bottom-left button action; omit to make it a non-navigating label. */
  onLeftPress?: () => void;
  /** When provided, shows a back chevron in the top-left. */
  onBack?: () => void;
  /** Add bottom safe-area padding (for full-screen use without a tab bar). */
  safeAreaBottom?: boolean;
};

/**
 * The full-screen quote view: background image + dark overlay, a centered
 * quote with download/heart/share actions, and a bottom row with a labelled
 * button (left) and the customize palette (right). Shared by the home tab and
 * the per-topic screen.
 */
export function QuoteView({
  text,
  author,
  leftIcon,
  leftLabel,
  onLeftPress,
  onBack,
  safeAreaBottom = false,
}: QuoteViewProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [favorited, setFavorited] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Image source={BG} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />

      <View style={[styles.body, { paddingTop: insets.top }]}>
        {onBack ? (
          <View style={styles.header}>
            <Pressable
              onPress={onBack}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <ChevronLeftIcon size={24} color={Colors.white} />
            </Pressable>
          </View>
        ) : null}

        <View style={styles.content}>
          <View style={styles.quote}>
            <View style={styles.textBlock}>
              <Text style={styles.quoteText}>{text}</Text>
              <Text style={styles.author}>- {author} -</Text>
            </View>

            <View style={styles.actions}>
              <Pressable hitSlop={8} onPress={() => router.push("/download")}>
                <DownloadIcon size={24} color={Colors.white} />
              </Pressable>
              <Pressable
                hitSlop={8}
                onPress={() => setFavorited((f) => !f)}
                accessibilityRole="button"
                accessibilityLabel={favorited ? "Unfavorite" : "Favorite"}
                accessibilityState={{ selected: favorited }}
              >
                <HeartIcon
                  size={24}
                  color={favorited ? Colors.brand : Colors.white}
                  filled={favorited}
                />
              </Pressable>
              <Pressable
                hitSlop={8}
                onPress={() => router.push("/collections")}
              >
                <FilePlusIcon size={24} color={Colors.white} />
              </Pressable>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.bottomRow,
            { paddingBottom: (safeAreaBottom ? insets.bottom : 0) + 16 },
          ]}
        >
          <Pressable
            style={styles.leftButton}
            onPress={onLeftPress}
            disabled={!onLeftPress}
          >
            {leftIcon}
            <Text style={styles.leftButtonText}>{leftLabel}</Text>
          </Pressable>
          <Pressable
            style={styles.iconButton}
            onPress={() => router.push("/customize")}
          >
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  },
  leftButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Colors.surface,
  },
  leftButtonText: {
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
