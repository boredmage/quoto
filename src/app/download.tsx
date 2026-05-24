import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";

import { DownloadableQuote } from "../components/DownloadableQuote";
import { ModalHeader } from "../components/ModalHeader";
import { BookmarkIcon, CopyIcon, PaletteIcon } from "../components/icons";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { FALLBACK_QUOTES } from "../services/quotes";

export default function Download() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cardRef = useRef<View>(null);

  // The quote to render/share is passed in via params (home, topic, a
  // collection); fall back to a bundled quote if opened without one.
  const params = useLocalSearchParams<{ text?: string; author?: string }>();
  const quote = {
    text: params.text ?? FALLBACK_QUOTES[0].text,
    author: params.author ?? FALLBACK_QUOTES[0].author,
  };

  const handleDownload = async () => {
    try {
      const uri = await captureRef(cardRef, { format: "png", quality: 1 });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: "Save or share quote",
        });
      }
    } catch {
      // capture/share cancelled or unavailable — nothing to do
    }
  };

  const actions = [
    {
      key: "customize",
      label: "Customize",
      Icon: PaletteIcon,
      onPress: () => router.replace("/customize"),
    },
    {
      key: "add",
      label: "Add",
      Icon: BookmarkIcon,
      onPress: () =>
        router.replace({ pathname: "/collections", params: quote }),
    },
    { key: "copy", label: "Copy text", Icon: CopyIcon, onPress: () => {} },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <ModalHeader title="Download" />

      <View style={styles.content}>
        <View ref={cardRef} collapsable={false}>
          <DownloadableQuote text={quote.text} author={quote.author} />
        </View>
        <Pressable style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.downloadText}>Download image</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillsScroll}
        contentContainerStyle={[
          styles.pills,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        {actions.map(({ key, label, Icon, onPress }) => (
          <Pressable key={key} style={styles.pill} onPress={onPress}>
            <Icon size={20} color={Colors.white} />
            <Text style={styles.pillText}>{label}</Text>
          </Pressable>
        ))}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingVertical: 24,
  },
  downloadButton: {
    width: 260,
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.text,
  },
  pillsScroll: {
    flexGrow: 0,
  },
  pills: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Colors.surface,
  },
  pillText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.white,
  },
});
