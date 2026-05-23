import "../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import { fontAssets } from "../constants/fonts";

export default function RootLayout() {
  // Fonts are embedded natively by the expo-font config plugin (app.json); this
  // registers the same families for web and waits until they are ready.
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
