import "../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { AnimatedSplash } from "../components/AnimatedSplash";
import { Colors } from "../constants/colors";
import { fontAssets } from "../constants/fonts";
import { hydrateQuotePool } from "../services/quotePool";
import { CollectionsProvider } from "../store/collections";
import { FavoritesProvider } from "../store/favorites";

// Keep the native splash (brand background + logo) up until fonts AND the
// prefetched quote pool are ready, then fade out to the AnimatedSplash and the
// app — see _layout below.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 300, fade: true });

// Don't block the splash forever if the network is slow on a first launch —
// the UI falls back to bundled quotes and the real pool arrives in the
// background.
const POOL_TIMEOUT_MS = 2500;

export default function RootLayout() {
  // Fonts are embedded natively by the expo-font config plugin (app.json); this
  // registers the same families for web and waits until they are ready.
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const [poolReady, setPoolReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  // Hydrate the quote pool in parallel with font loading so the splash window
  // covers the prefetch — by the time the user sees the home screen, the pool
  // has a real batch (cache hit) or a freshly fetched one.
  useEffect(() => {
    let cancelled = false;
    const markReady = () => {
      if (!cancelled) setPoolReady(true);
    };
    hydrateQuotePool().then(markReady, markReady);
    const t = setTimeout(markReady, POOL_TIMEOUT_MS);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  const appReady = (fontsLoaded || !!fontError) && poolReady;

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
    <FavoritesProvider>
      <CollectionsProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
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
          <Stack.Screen name="collection" />
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
      </CollectionsProvider>
    </FavoritesProvider>
  );
}
