import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "../components/ScreenHeader";
import { Slider } from "../components/ui/Slider";
import { TimePickerSheet } from "../components/ui/TimePickerSheet";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

type Editing = "start" | "end" | null;

export default function Reminders() {
  const [count, setCount] = useState(7);
  const [start, setStart] = useState("06:20");
  const [end, setEnd] = useState("18:20");
  const [editing, setEditing] = useState<Editing>(null);

  return (
    <View style={styles.root}>
      <ScreenHeader title="Reminders" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sliderCard}>
          <View style={styles.sliderTop}>
            <Text style={styles.sliderLabel}>How many</Text>
            <Text style={styles.sliderLabel}>{count.toFixed(1)}x</Text>
          </View>
          <Slider
            value={count}
            minimumValue={0}
            maximumValue={20}
            step={1}
            onValueChange={setCount}
          />
          <View style={styles.sliderBounds}>
            <Text style={styles.boundText}>0</Text>
            <Text style={styles.boundText}>20</Text>
          </View>
        </View>

        <View style={styles.timesCard}>
          <Pressable
            style={[styles.timeRow, styles.timeRowBorder]}
            onPress={() => setEditing("start")}
          >
            <Text style={styles.timeLabel}>Start at</Text>
            <View style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>{start}</Text>
            </View>
          </Pressable>
          <Pressable style={styles.timeRow} onPress={() => setEditing("end")}>
            <Text style={styles.timeLabel}>End at</Text>
            <View style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>{end}</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>

      <TimePickerSheet
        visible={editing !== null}
        value={editing === "end" ? end : start}
        onCancel={() => setEditing(null)}
        onSave={(value) => {
          if (editing === "start") setStart(value);
          else if (editing === "end") setEnd(value);
          setEditing(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  sliderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  sliderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderLabel: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.white,
  },
  sliderBounds: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boundText: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    color: Colors.white,
  },
  timesCard: {
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
  timeRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.onSurface,
  },
  timeLabel: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    color: Colors.white,
  },
  timeBadge: {
    backgroundColor: Colors.onSurface,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timeBadgeText: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    color: Colors.white,
  },
});
