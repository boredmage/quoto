import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

// The quote-mark logo (root assets/, same image the native splash uses) so the
// hand-off from the native splash to this animated one is seamless.
const LOGO = require("../../assets/splash-icon.png");

// How long the full splash (logo + wordmark) is held before it fades away.
const HOLD_MS = 900;
const FADE_MS = 300;

/**
 * Full-screen splash matching the Quoto design (brand background, quote-mark
 * logo, and the "Quoto" wordmark below). Rendered on top of the app once fonts
 * are ready, picking up where the native splash (logo only) left off, then
 * fades out to reveal the app.
 */
export function AnimatedSplash({ onFinish }: { onFinish: () => void }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_MS,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, HOLD_MS);
    return () => clearTimeout(timer);
  }, [opacity, onFinish]);

  return (
    <Animated.View style={[styles.root, { opacity }]}>
      <StatusBar style="light" />
      <View style={styles.logoBox}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.brand}>Quoto</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBox: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 45,
  },
  brand: {
    fontFamily: Fonts.inter.bold,
    fontSize: 24,
    lineHeight: 24 * 1.4,
    color: Colors.black,
    textAlign: "center",
  },
});
