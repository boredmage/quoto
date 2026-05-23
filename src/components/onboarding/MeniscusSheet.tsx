import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { Colors } from "../../constants/colors";

/**
 * Normalized depth of the meniscus across the width — 0 at the sheet's top edge
 * (the sides), 1 at the deepest point of the orange bulge (the centre). Sampled
 * directly from the Figma "OnboardingLayer" shape (node 15:2084).
 */
const PROFILE = [
  0, 0.159, 0.29, 0.406, 0.493, 0.565, 0.638, 0.696, 0.754, 0.797, 0.826, 0.87,
  0.899, 0.913, 0.942, 0.957, 0.971, 0.985, 0.985, 1, 1, 1, 1, 0.985, 0.985,
  0.971, 0.957, 0.942, 0.913, 0.884, 0.855, 0.826, 0.783, 0.725, 0.667, 0.609,
  0.536, 0.435, 0.319, 0.188, 0,
];

/** Deepest point of the bulge as a fraction of width (≈ 70px on a 390pt screen). */
const DIP_RATIO = 0.177;

type MeniscusSheetProps = {
  width: number;
  height: number;
  children?: ReactNode;
};

/**
 * The dark onboarding panel whose top edge curves down in the centre where the
 * orange background bulges into it (a meniscus). Drawn as an SVG path so it
 * stays crisp at any width; the area above the curve is transparent, letting
 * the orange background and phone mockup show through.
 */
export function MeniscusSheet({ width, height, children }: MeniscusSheetProps) {
  const dip = width * DIP_RATIO;
  const segments = PROFILE.length - 1;

  let d = `M 0 ${(PROFILE[0] * dip).toFixed(2)}`;
  for (let i = 1; i <= segments; i++) {
    const x = ((i / segments) * width).toFixed(2);
    const y = (PROFILE[i] * dip).toFixed(2);
    d += ` L ${x} ${y}`;
  }
  d += ` L ${width.toFixed(2)} ${height.toFixed(2)} L 0 ${height.toFixed(2)} Z`;

  return (
    <View style={{ width, height }}>
      <Svg
        width={width}
        height={height}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <Path d={d} fill={Colors.sheet} />
      </Svg>
      <View style={{ flex: 1, paddingTop: dip + 52, paddingHorizontal: 24 }}>
        {children}
      </View>
    </View>
  );
}
