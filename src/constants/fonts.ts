import { Platform } from "react-native";

// Import from per-weight subpaths (not the package root) so Metro bundles only
// the 4 weights we use per family, instead of every weight the package ships.
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { MonaSans_400Regular } from "@expo-google-fonts/mona-sans/400Regular";
import { MonaSans_500Medium } from "@expo-google-fonts/mona-sans/500Medium";
import { MonaSans_600SemiBold } from "@expo-google-fonts/mona-sans/600SemiBold";
import { MonaSans_700Bold } from "@expo-google-fonts/mona-sans/700Bold";
import { Urbanist_400Regular } from "@expo-google-fonts/urbanist/400Regular";
import { Urbanist_500Medium } from "@expo-google-fonts/urbanist/500Medium";
import { Urbanist_600SemiBold } from "@expo-google-fonts/urbanist/600SemiBold";
import { Urbanist_700Bold } from "@expo-google-fonts/urbanist/700Bold";

/**
 * Fonts are embedded natively at build time by the `expo-font` config plugin,
 * which points at the .ttf files inside `@expo-google-fonts/*` (see app.json).
 *
 * The family name to reference differs per platform:
 *   - iOS    → the font's PostScript name      ("Inter-SemiBold")
 *   - Android→ the file name without extension  ("Inter_600SemiBold")
 *   - Web    → the `useFonts` key, which we set to the same Android-style name
 *
 * `family()` resolves the right one so screens can just use `Fonts.inter.bold`.
 */
const family = (ios: string, other: string) =>
  Platform.select({ ios, default: other }) as string;

export const Fonts = {
  inter: {
    regular: family("Inter-Regular", "Inter_400Regular"),
    medium: family("Inter-Medium", "Inter_500Medium"),
    semibold: family("Inter-SemiBold", "Inter_600SemiBold"),
    bold: family("Inter-Bold", "Inter_700Bold"),
  },
  urbanist: {
    regular: family("Urbanist-Regular", "Urbanist_400Regular"),
    medium: family("Urbanist-Medium", "Urbanist_500Medium"),
    semibold: family("Urbanist-SemiBold", "Urbanist_600SemiBold"),
    bold: family("Urbanist-Bold", "Urbanist_700Bold"),
  },
  monaSans: {
    regular: family("MonaSans-Regular", "MonaSans_400Regular"),
    medium: family("MonaSans-Medium", "MonaSans_500Medium"),
    semibold: family("MonaSans-SemiBold", "MonaSans_600SemiBold"),
    bold: family("MonaSans-Bold", "MonaSans_700Bold"),
  },
} as const;

/**
 * Passed to `useFonts` in the root layout. The config plugin already embeds
 * these natively (instant), but registering them at runtime also covers web
 * and is a harmless no-op on native. The map keys become the web font family.
 */
export const fontAssets = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  MonaSans_400Regular,
  MonaSans_500Medium,
  MonaSans_600SemiBold,
  MonaSans_700Bold,
} as const;
