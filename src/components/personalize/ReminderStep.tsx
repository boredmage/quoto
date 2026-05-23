import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

/**
 * Reminders step (the 8th personalization screen): a "How many" slider plus
 * start/end time fields. The time fields are display-only placeholders for now.
 */
export function ReminderStep() {
  const [count, setCount] = useState(7);
  const start = "06:20";
  const end = "18:20";

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>How many</Text>
          <Text style={styles.label}>{count.toFixed(1)}x</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={20}
          step={1}
          value={count}
          onValueChange={setCount}
          minimumTrackTintColor={Colors.white}
          maximumTrackTintColor="rgba(255, 255, 255, 0.15)"
          thumbTintColor={Colors.white}
        />
        <View style={styles.rowBetween}>
          <Text style={styles.scale}>0</Text>
          <Text style={styles.scale}>20</Text>
        </View>
      </View>

      <View style={styles.timeCard}>
        <View style={styles.timeRow}>
          <Text style={styles.timeLabel}>Start at</Text>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{start}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.timeRow}>
          <Text style={styles.timeLabel}>End at</Text>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{end}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 16,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    color: Colors.white,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  scale: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    color: Colors.textVariant,
  },
  timeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  timeLabel: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    color: Colors.white,
  },
  pill: {
    backgroundColor: "#2e2e2e",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pillText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.white,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
});
