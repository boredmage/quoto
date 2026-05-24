import "../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { AnimatedSplash } from "../components/AnimatedSplash";
import { fontAssets } from "../constants/fonts";

// Keep the native splash (brand background + logo) up until fonts are ready,
// then fade it out — see the hand-off to <AnimatedSplash> below.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 300, fade: true });

export default function RootLayout() {
  // Fonts are embedded natively by the expo-font config plugin (app.json); this
  // registers the same families for web and waits until they are ready.
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const [splashDone, setSplashDone] = useState(false);

  const appReady = fontsLoaded || !!fontError;

  useEffect(() => {
    if (appReady) {
      // App can render now; hand the native splash off to <AnimatedSplash>,
      // which shows the same logo plus the "Quoto" wordmark before fading.
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null; // native splash stays visible
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="personalize" />
        <Stack.Screen name="enable-notifications" />
        <Stack.Screen name="home" />
        <Stack.Screen name="topic" />
        <Stack.Screen name="pro" />
        <Stack.Screen name="topics-follow" />
        <Stack.Screen name="reminders" />
        <Stack.Screen name="appearance" />
        <Stack.Screen name="language" />
        <Stack.Screen name="help-center" />
        <Stack.Screen name="collections" />
        <Stack.Screen name="new-collection" />
        <Stack.Screen
          name="download"
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen
          name="customize"
          options={{ presentation: "fullScreenModal" }}
        />
      </Stack>
      {!splashDone ? (
        <AnimatedSplash onFinish={() => setSplashDone(true)} />
      ) : null}
    </>
  );
}
