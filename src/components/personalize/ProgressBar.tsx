import { StyleSheet, View } from "react-native";

import { Colors } from "../../constants/colors";

type ProgressBarProps = {
  total: number;
  /** Zero-based index of the current step; segments up to and including it are filled. */
  current: number;
};

export function ProgressBar({ total, current }: ProgressBarProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.segment, i <= current ? styles.filled : styles.empty]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  segment: {
    flex: 1,
    height: 9,
    borderRadius: 20,
  },
  filled: {
    backgroundColor: Colors.white,
  },
  empty: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
});
