import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "../components/icons";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Radio } from "../components/ui/Radio";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const COLLECTIONS = [
  { id: "best", title: "My best collection", count: 4 },
  { id: "motivational", title: "Motivational quotes", count: 3 },
  { id: "new", title: "New collectioon", count: 2 },
];

export default function Collections() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(COLLECTIONS[0].id);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Pressable
          style={styles.back}
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityLabel="Go back"
        >
          <ArrowLeftIcon size={24} color={Colors.white} />
        </Pressable>
        <Text style={styles.title}>Collections</Text>
        <Pressable style={styles.addNew} hitSlop={8}>
          <Text style={styles.addNewText}>Add new</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {COLLECTIONS.map((c) => (
          <Pressable
            key={c.id}
            style={styles.card}
            onPress={() => setSelected(c.id)}
          >
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{c.title}</Text>
              <Text style={styles.cardCount}>{c.count} quotes (s)</Text>
            </View>
            <Radio selected={selected === c.id} />
          </Pressable>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <PrimaryButton title="Save" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  back: {
    position: "absolute",
    left: 16,
    top: 12,
  },
  title: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: Colors.white,
  },
  addNew: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  addNewText: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    color: Colors.white,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 71,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  cardText: {
    flex: 1,
    gap: 8,
  },
  cardTitle: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.white,
  },
  cardCount: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    color: Colors.textVariant,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
