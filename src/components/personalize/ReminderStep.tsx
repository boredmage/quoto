import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Slider } from "../ui/Slider";
import { TimePickerSheet } from "../ui/TimePickerSheet";

type Editing = "start" | "end" | null;

/**
 * Reminders step (the 8th personalization screen): a "How many" slider plus
 * start/end time fields. Tapping a time badge opens a wheel time picker sheet.
 */
export function ReminderStep() {
  const [count, setCount] = useState(7);
  const [start, setStart] = useState("06:20");
  const [end, setEnd] = useState("18:20");
  const [editing, setEditing] = useState<Editing>(null);

  const handleSave = (value: string) => {
    if (editing === "start") setStart(value);
    else if (editing === "end") setEnd(value);
    setEditing(null);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.sliderCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>How many</Text>
          <Text style={styles.label}>{count.toFixed(1)}x</Text>
        </View>
        <Slider
          value={count}
          minimumValue={0}
          maximumValue={20}
          step={1}
          onValueChange={setCount}
        />
        <View style={styles.rowBetween}>
          <Text style={styles.scale}>0</Text>
          <Text style={styles.scale}>20</Text>
        </View>
      </View>

      <View style={styles.timeCard}>
        <Pressable
          style={[styles.timeRow, styles.timeRowDivider]}
          onPress={() => setEditing("start")}
        >
          <Text style={styles.timeLabel}>Start at</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{start}</Text>
          </View>
        </Pressable>
        <Pressable style={styles.timeRow} onPress={() => setEditing("end")}>
          <Text style={styles.timeLabel}>End at</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{end}</Text>
          </View>
        </Pressable>
      </View>

      <TimePickerSheet
        visible={editing !== null}
        value={editing === "end" ? end : start}
        onCancel={() => setEditing(null)}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 16,
  },
  sliderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.white,
  },
  scale: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    color: Colors.white,
  },
  timeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: "hidden",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  timeRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.onSurface,
  },
  timeLabel: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.white,
  },
  badge: {
    backgroundColor: Colors.onSurface,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    color: Colors.white,
  },
});
