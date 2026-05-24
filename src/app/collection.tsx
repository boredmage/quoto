import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "../components/ScreenHeader";
import { DownloadIcon } from "../components/icons";
import { Colors } from "../constants/colors";
import { COLLECTIONS } from "../constants/collections";
import { Fonts } from "../constants/fonts";

/** The quotes saved in a single collection, opened from the Library tab. */
export default function Collection() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const collection = COLLECTIONS.find((c) => c.id === id);
  const [quotes, setQuotes] = useState(collection?.quotes ?? []);

  const remove = (text: string) =>
    setQuotes((qs) => qs.filter((q) => q.text !== text));

  return (
    <View style={styles.root}>
      <ScreenHeader
        title={collection?.title ?? "Collection"}
        right={
          <Pressable
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="More options"
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color={Colors.white}
            />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {quotes.map((q) => (
          <View key={q.text} style={styles.card}>
            <View style={styles.textContent}>
              <Text style={styles.quote}>{q.text}</Text>
              <Text style={styles.author}>- {q.author}</Text>
            </View>
            <View style={styles.actions}>
              <Pressable
                hitSlop={8}
                onPress={() => router.push("/download")}
                accessibilityRole="button"
                accessibilityLabel="Download quote"
              >
                <DownloadIcon size={24} color={Colors.white} />
              </Pressable>
              <Pressable
                hitSlop={8}
                onPress={() => remove(q.text)}
                accessibilityRole="button"
                accessibilityLabel="Remove from collection"
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={24}
                  color={Colors.white}
                />
              </Pressable>
            </View>
          </View>
        ))}

        {quotes.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No quotes in this collection</Text>
          </View>
        ) : null}
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
    gap: 12,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 16,
  },
  textContent: {
    gap: 12,
  },
  quote: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    color: Colors.white,
  },
  author: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.white,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  empty: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    color: Colors.textVariant,
  },
});
