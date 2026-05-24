import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { ComponentProps, ReactNode } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

const JEWEL = require("../../assets/images/backgrounds/jewel.png");

type MdiName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const mdi = (name: MdiName) => (
  <MaterialCommunityIcons name={name} size={24} color={Colors.white} />
);

type Item = { icon: ReactNode; label: string; value?: string; route?: string };

const MAIN_SETTINGS: Item[] = [
  { icon: mdi("account-circle-outline"), label: "Account settings" },
  {
    icon: mdi("check-circle-outline"),
    label: "Topics you follow",
    route: "/topics-follow",
  },
  { icon: mdi("bell-outline"), label: "Reminders", route: "/reminders" },
  { icon: mdi("volume-high"), label: "Theme sound" },
  {
    icon: mdi("palette-outline"),
    label: "Appearance",
    value: "Dark Yellow",
    route: "/appearance",
  },
  {
    icon: mdi("web"),
    label: "Language",
    value: "English",
    route: "/language",
  },
];

const OTHER: Item[] = [
  {
    icon: mdi("help-circle-outline"),
    label: "Help center",
    route: "/help-center",
  },
  { icon: mdi("shield-outline"), label: "Security" },
  { icon: mdi("information-outline"), label: "About the app" },
  { icon: mdi("account-plus-outline"), label: "Invite friends" },
  { icon: mdi("star-outline"), label: "Rate the app" },
];

function Row({
  icon,
  label,
  value,
  route,
  last,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
  route?: string;
  last?: boolean;
}) {
  const router = useRouter();
  return (
    <Pressable
      style={[styles.row, !last && styles.rowBorder]}
      disabled={!route}
      onPress={() => route && router.push(route)}
    >
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

function Section({ title, items }: { title: string; items: Item[] }) {
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
            route={item.route}
            last={i === items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

export default function Profile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
        <Pressable style={styles.subCard} onPress={() => router.push("/pro")}>
          <Svg style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="sub" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#f79509" />
                <Stop offset="1" stopColor="#fecc4b" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#sub)" />
          </Svg>
          <Image source={JEWEL} style={styles.jewel} resizeMode="contain" />
          <Text style={styles.subTitle}>Try Quoto Premium</Text>
          <Text style={styles.subText}>
            {"Access all categories, quotes,\nthemes!"}
          </Text>
        </Pressable>

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
    height: 108,
    justifyContent: "center",
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
  jewel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 125,
    height: 100,
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
