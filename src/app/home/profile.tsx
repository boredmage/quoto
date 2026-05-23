import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import type { ComponentProps, ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

type MdiName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const mdi = (name: MdiName) => (
  <MaterialCommunityIcons name={name} size={24} color={Colors.white} />
);

const MAIN_SETTINGS: { icon: ReactNode; label: string; value?: string }[] = [
  { icon: mdi("account-circle-outline"), label: "Account settings" },
  { icon: mdi("check-circle-outline"), label: "Topics you follow" },
  { icon: mdi("bell-outline"), label: "Reminders" },
  { icon: mdi("volume-high"), label: "Theme sound" },
  { icon: mdi("palette-outline"), label: "Appearance", value: "Dark Yellow" },
  { icon: mdi("web"), label: "Language", value: "English" },
];

const OTHER: { icon: ReactNode; label: string }[] = [
  { icon: mdi("help-circle-outline"), label: "Help center" },
  { icon: mdi("shield-outline"), label: "Security" },
  { icon: mdi("information-outline"), label: "About the app" },
  { icon: mdi("account-plus-outline"), label: "Invite friends" },
  { icon: mdi("star-outline"), label: "Rate the app" },
];

function Row({
  icon,
  label,
  value,
  last,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
  last?: boolean;
}) {
  return (
    <Pressable style={[styles.row, !last && styles.rowBorder]}>
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={styles.rowLabel}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={Colors.textVariant}
      />
    </Pressable>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: { icon: ReactNode; label: string; value?: string }[];
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.card}>
        {items.map((item, i) => (
          <Row
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
            last={i === items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

export default function Profile() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subCard}>
          <Svg style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="sub" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#f79509" />
                <Stop offset="1" stopColor="#fecc4b" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#sub)" />
          </Svg>
          <Text style={styles.subTitle}>Try Quoto Premium</Text>
          <Text style={styles.subText}>
            Access all categories, quotes, themes!
          </Text>
        </View>

        <Section title="MAIN SETTINGS" items={MAIN_SETTINGS} />
        <Section title="OTHER" items={OTHER} />
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
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  subCard: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    padding: 12,
    gap: 8,
  },
  subTitle: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: Colors.white,
  },
  subText: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.white,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.textVariant,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.onSurface,
  },
  rowIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    flex: 1,
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    color: Colors.white,
  },
  rowValue: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    color: Colors.textVariant,
  },
});
