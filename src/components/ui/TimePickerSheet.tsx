import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import {
  WHEEL_ITEM_HEIGHT,
  WHEEL_VISIBLE_ROWS,
  WheelPicker,
} from "./WheelPicker";

const HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const PERIODS = ["AM", "PM"];

/** "HH:MM" (24h) -> wheel indices. */
function parse(value: string) {
  const [h, m] = value.split(":").map((n) => parseInt(n, 10));
  const period = h >= 12 ? 1 : 0;
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return { hourIndex: hour12 - 1, minuteIndex: m, periodIndex: period };
}

/** wheel indices -> "HH:MM" (24h). */
function format(hourIndex: number, minuteIndex: number, periodIndex: number) {
  const hour12 = hourIndex + 1;
  const h24 = periodIndex === 1 ? (hour12 % 12) + 12 : hour12 % 12;
  return `${String(h24).padStart(2, "0")}:${String(minuteIndex).padStart(2, "0")}`;
}

type TimePickerSheetProps = {
  visible: boolean;
  /** Current value as "HH:MM" (24h). */
  value: string;
  onCancel: () => void;
  onSave: (value: string) => void;
};

export function TimePickerSheet({
  visible,
  value,
  onCancel,
  onSave,
}: TimePickerSheetProps) {
  const insets = useSafeAreaInsets();
  const initial = parse(value);

  const [hourIndex, setHourIndex] = useState(initial.hourIndex);
  const [minuteIndex, setMinuteIndex] = useState(initial.minuteIndex);
  const [periodIndex, setPeriodIndex] = useState(initial.periodIndex);

  // Reset the wheels to the incoming value each time the sheet opens.
  useEffect(() => {
    if (visible) {
      const next = parse(value);
      setHourIndex(next.hourIndex);
      setMinuteIndex(next.minuteIndex);
      setPeriodIndex(next.periodIndex);
    }
  }, [visible, value]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onCancel} />

        <View style={[styles.sheet, { paddingBottom: insets.bottom + 8 }]}>
          <View style={styles.handle} />

          <View style={styles.picker}>
            <View style={styles.highlight} pointerEvents="none" />
            <View style={styles.wheels}>
              <WheelPicker
                data={HOURS}
                initialIndex={initial.hourIndex}
                onChange={setHourIndex}
                width={48}
                align="right"
              />
              <WheelPicker
                data={MINUTES}
                initialIndex={initial.minuteIndex}
                onChange={setMinuteIndex}
                width={48}
                align="left"
              />
              <WheelPicker
                data={PERIODS}
                initialIndex={initial.periodIndex}
                onChange={setPeriodIndex}
                width={48}
                align="center"
              />
            </View>
          </View>

          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, styles.cancel]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.save]}
              onPress={() =>
                onSave(format(hourIndex, minuteIndex, periodIndex))
              }
            >
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
  },
  sheet: {
    backgroundColor: Colors.onSurface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 16,
  },
  handle: {
    width: 48,
    height: 6,
    borderRadius: 12,
    backgroundColor: Colors.onSurfaceVariant,
  },
  picker: {
    width: "100%",
    height: WHEEL_ITEM_HEIGHT * WHEEL_VISIBLE_ROWS,
    justifyContent: "center",
  },
  highlight: {
    position: "absolute",
    left: 0,
    right: 0,
    top: ((WHEEL_VISIBLE_ROWS - 1) / 2) * WHEEL_ITEM_HEIGHT,
    height: WHEEL_ITEM_HEIGHT,
    borderRadius: 8,
    backgroundColor: Colors.onSurfaceVariant,
  },
  wheels: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  button: {
    flex: 1,
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancel: {
    backgroundColor: Colors.onSurfaceVariant,
  },
  cancelText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.white,
  },
  save: {
    backgroundColor: Colors.brand,
  },
  saveText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.black,
  },
});
