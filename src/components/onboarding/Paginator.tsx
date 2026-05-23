import { Animated, StyleSheet, View } from "react-native";

import { Colors } from "../../constants/colors";

type PaginatorProps = {
  count: number;
  scrollX: Animated.Value;
  slideWidth: number;
};

/** Animated pagination dots — the active dot grows into an orange pill. */
export function Paginator({ count, scrollX, slideWidth }: PaginatorProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => {
        const inputRange = [
          (i - 1) * slideWidth,
          i * slideWidth,
          (i + 1) * slideWidth,
        ];
        const width = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: "clamp",
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [Colors.dotInactive, Colors.brand, Colors.dotInactive],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i}
            style={[styles.dot, { width, backgroundColor }]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
