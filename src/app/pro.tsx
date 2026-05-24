import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenHeader } from "../components/ScreenHeader";
import { CheckIcon } from "../components/icons";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const LOGO = require("../../assets/ios.icon/Assets/quote.png");

const FEATURES = [
  "Quotes you can’t find anywhere else",
  "Categories for any situation",
  "Original themes, customizable",
  "Daily motivational quotes",
  "Share Without Watermark",
  "Unlock Exclusive Quotes",
  "Custom Themes & Fonts",
];

type Plan = "annual" | "monthly";

export default function Pro() {
  const insets = useSafeAreaInsets();
  const [plan, setPlan] = useState<Plan>("monthly");

  return (
    <View style={styles.root}>
      <ScreenHeader title="Try Quoto Premium" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleBlock}>
          <View style={styles.logoBox}>
            <View style={styles.logoInner}>
              <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            </View>
          </View>
          <Text style={styles.heading}>Unlock everything</Text>
        </View>

        <View style={styles.features}>
          {FEATURES.map((feature) => (
            <View key={feature} style={styles.feature}>
              <View style={styles.check}>
                <CheckIcon size={12} color={Colors.white} />
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.plans}>
          <Pressable
            style={[styles.plan, plan === "annual" && styles.planActive]}
            onPress={() => setPlan("annual")}
          >
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3 days free</Text>
            </View>
            <View style={styles.planBody}>
              <Text style={styles.planLabel}>Annual</Text>
              <Text style={styles.planPrice}>$2.79/month</Text>
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.plan,
              styles.planCentered,
              plan === "monthly" && styles.planActive,
            ]}
            onPress={() => setPlan("monthly")}
          >
            <Text style={styles.planLabel}>Monthly</Text>
            <Text style={styles.planPrice}>$11.19/month</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
        <Pressable style={styles.continue}>
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
        <Text style={styles.restore}>
          <Text style={styles.restoreMuted}>Already a subscriber? </Text>
          <Text style={styles.restoreLink}>Restore Purchase</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 40,
  },
  titleBlock: {
    alignItems: "center",
    gap: 12,
  },
  logoBox: {
    backgroundColor: Colors.brand,
    borderRadius: 16,
    padding: 12,
  },
  logoInner: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 47,
    height: 35,
  },
  heading: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    textAlign: "center",
    color: Colors.text,
  },
  features: {
    gap: 12,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    flex: 1,
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.white,
  },
  plans: {
    flexDirection: "row",
    gap: 16,
  },
  plan: {
    flex: 1,
    height: 109,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: Colors.onSurface,
    backgroundColor: Colors.surface,
    paddingBottom: 16,
    gap: 8,
  },
  planCentered: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
  },
  planActive: {
    borderColor: Colors.brand,
  },
  badge: {
    backgroundColor: Colors.onSurface,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  badgeText: {
    fontFamily: Fonts.inter.regular,
    fontSize: 10,
    lineHeight: 10 * 1.3,
    color: Colors.white,
  },
  planBody: {
    alignItems: "center",
    gap: 8,
  },
  planLabel: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    textAlign: "center",
    color: Colors.white,
  },
  planPrice: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    textAlign: "center",
    color: Colors.white,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    alignItems: "center",
    gap: 12,
  },
  continue: {
    width: "100%",
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.black,
  },
  restore: {
    textAlign: "center",
  },
  restoreMuted: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    color: Colors.textVariant,
  },
  restoreLink: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.brand,
  },
});
