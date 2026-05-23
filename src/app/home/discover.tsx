import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import type { ComponentProps } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const CATEGORIES: { name: string; icon: IconName }[] = [
  { name: "Growth", icon: "trending-up" },
  { name: "Resillience", icon: "image-outline" },
  { name: "Happiness", icon: "weather-sunny" },
  { name: "Creativity", icon: "format-paint" },
  { name: "Patience", icon: "clock-outline" },
  { name: "Mindfulness", icon: "flower-outline" },
  { name: "Leadership", icon: "crown-outline" },
  { name: "Life", icon: "pulse" },
  { name: "Wisdom", icon: "brain" },
  { name: "Love", icon: "heart-outline" },
  { name: "Time", icon: "timer-sand" },
  { name: "Inspiration", icon: "lightbulb-outline" },
  { name: "Success", icon: "trophy-outline" },
  { name: "Spirituality", icon: "star-outline" },
  { name: "Courage", icon: "shield-outline" },
  { name: "Hope", icon: "weather-sunset-up" },
  { name: "Dreams", icon: "moon-waning-crescent" },
  { name: "Philosophy", icon: "bank-outline" },
  { name: "Friendship", icon: "account-group-outline" },
  { name: "Motivation", icon: "rocket-outline" },
];

export default function Discover() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 16) / 2;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Explore topics</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((c) => (
          <Pressable key={c.name} style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.cardTitle}>{c.name}</Text>
            <View style={styles.iconButton}>
              <MaterialCommunityIcons
                name={c.icon}
                size={24}
                color={Colors.white}
              />
            </View>
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
  header: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: Colors.white,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 16,
  },
  cardTitle: {
    width: "100%",
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.white,
  },
  iconButton: {
    alignSelf: "flex-end",
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.onSurface,
  },
});
