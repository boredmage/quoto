import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { type ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { useFavorites } from "../store/favorites";
import {
  FONTS,
  SWATCHES,
  THEMES,
  sizeForSlider,
  useQuoteStyle,
} from "../store/quoteStyle";
import type { Quote } from "../types/quote";
import {
  ChevronLeftIcon,
  DownloadIcon,
  FilePlusIcon,
  HeartIcon,
  PaletteIcon,
} from "./icons";

type QuoteViewProps = {
  quote: Quote;
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
 * The full-screen quote view: background (image with dark overlay, or the
 * solid colour the user picked in Customize), a centered quote in the chosen
 * font/size, action buttons, and a bottom row. Shared by Home and Topic.
 */
export function QuoteView({
  quote,
  leftIcon,
  leftLabel,
  onLeftPress,
  onBack,
  safeAreaBottom = false,
}: QuoteViewProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { style } = useQuoteStyle();
  const favorited = isFavorite(quote.id);

  const quoteParams = { text: quote.text, author: quote.author };
  const fontFamily = FONTS[style.font].family;
  const quoteSize = sizeForSlider(style.fontSize);
  const themeImage = THEMES[style.theme];
  const solidBg = SWATCHES[style.color];

  return (
    <View style={[styles.root, !themeImage && { backgroundColor: solidBg }]}>
      <StatusBar style="light" />
      {themeImage ? (
        <>
          <Image source={themeImage} style={styles.bg} resizeMode="cover" />
          <View style={styles.overlay} />
        </>
      ) : null}

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
              <Text
                style={[
                  styles.quoteText,
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

            <View style={styles.actions}>
              <Pressable
                hitSlop={8}
                onPress={() =>
                  router.push({ pathname: "/download", params: quoteParams })
                }
                accessibilityRole="button"
                accessibilityLabel="Download quote"
              >
                <DownloadIcon size={24} color={Colors.white} />
              </Pressable>
              <Pressable
                hitSlop={8}
                onPress={() => toggleFavorite(quote)}
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
                onPress={() =>
                  router.push({
                    pathname: "/collections",
                    params: quoteParams,
                  })
                }
                accessibilityRole="button"
                accessibilityLabel="Add to collection"
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
            onPress={() =>
              router.push({ pathname: "/customize", params: quoteParams })
            }
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
    textAlign: "center",
    color: Colors.text,
  },
  author: {
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
