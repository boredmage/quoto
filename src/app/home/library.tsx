import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../constants/colors";
import { COLLECTIONS } from "../../constants/collections";
import { Fonts } from "../../constants/fonts";

const TABS = ["Collections", "Favorites"] as const;
type Tab = (typeof TABS)[number];

export default function Library() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("Collections");

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Library</Text>
        <Pressable hitSlop={8} accessibilityLabel="Search">
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={Colors.white}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tabs}>
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <Pressable
                key={t}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setTab(t)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {t}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {tab === "Collections" ? (
          <>
            <View style={styles.list}>
              {COLLECTIONS.map((c) => (
                <Pressable key={c.id} style={styles.card}>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{c.title}</Text>
                    <Text style={styles.cardCount}>{c.count} quotes (s)</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={Colors.white}
                  />
                </Pressable>
              ))}
            </View>

            <Pressable style={styles.createButton}>
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={Colors.text}
              />
              <Text style={styles.createText}>Create new collection</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No favorites yet</Text>
          </View>
        )}
      </ScrollView>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: Colors.white,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },
  tabs: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 10,
    backgroundColor: Colors.surface,
  },
  tab: {
    flex: 1,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: Colors.onSurface,
  },
  tabText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.textVariant,
  },
  tabTextActive: {
    color: Colors.white,
  },
  list: {
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
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.surface,
  },
  createText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.text,
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
