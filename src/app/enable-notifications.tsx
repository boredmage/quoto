import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const IMAGE = require("../assets/images/enable-notification-image.png");
const IMAGE_WIDTH = 1560;
const IMAGE_HEIGHT = 1616;

export default function EnableNotifications() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Full-bleed image; derive an explicit height from the source ratio.
  const imageHeight = (width * IMAGE_HEIGHT) / IMAGE_WIDTH;

  const finish = () => router.replace("/home");

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <View style={styles.paragraphs}>
          <Text style={styles.title}>I am work better with reminders</Text>
          <Text style={styles.subtitle}>
            Allowing notifications is simple but it’ll have a big impact in your
            life
          </Text>
        </View>

        {/* Full-bleed mockup — its gradient fades into the dark background. */}
        <Image
          source={IMAGE}
          resizeMode="contain"
          style={{ width, height: imageHeight }}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={[styles.button, styles.notNow]}
          onPress={finish}
          accessibilityRole="button"
        >
          <Text style={styles.notNowText}>Not now</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.enable]}
          onPress={finish}
          accessibilityRole="button"
        >
          <Text style={styles.enableText}>Enable</Text>
        </Pressable>
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
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 24,
    gap: 24,
    overflow: "hidden",
  },
  paragraphs: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    fontFamily: Fonts.inter.bold,
    fontSize: 24,
    lineHeight: 24 * 1.4,
    textAlign: "center",
    color: Colors.text,
  },
  subtitle: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    textAlign: "center",
    color: Colors.textVariant,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  button: {
    flex: 1,
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  notNow: {
    backgroundColor: Colors.onSurfaceVariant,
  },
  notNowText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.white,
  },
  enable: {
    backgroundColor: Colors.brand,
  },
  enableText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.black,
  },
});
