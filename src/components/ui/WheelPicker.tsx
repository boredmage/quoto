import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollView,
} from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

export const WHEEL_ITEM_HEIGHT = 40;
export const WHEEL_VISIBLE_ROWS = 5;
const PAD = ((WHEEL_VISIBLE_ROWS - 1) / 2) * WHEEL_ITEM_HEIGHT;

type WheelPickerProps = {
  data: string[];
  initialIndex: number;
  onChange: (index: number) => void;
  width: number;
  align?: "left" | "center" | "right";
};

/**
 * A single scrollable wheel column. The centred row is full size/opacity and
 * rows fade + shrink with distance, matching the Figma time-picker wheels.
 */
export function WheelPicker({
  data,
  initialIndex,
  onChange,
  width,
  align = "center",
}: WheelPickerProps) {
  const scrollY = useRef(
    new Animated.Value(initialIndex * WHEEL_ITEM_HEIGHT),
  ).current;
  const ref = useRef<ScrollView>(null);

  useEffect(() => {
    const id = setTimeout(
      () =>
        ref.current?.scrollTo({
          y: initialIndex * WHEEL_ITEM_HEIGHT,
          animated: false,
        }),
      0,
    );
    return () => clearTimeout(id);
  }, [initialIndex]);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.y / WHEEL_ITEM_HEIGHT);
    onChange(Math.max(0, Math.min(data.length - 1, i)));
  };

  return (
    <View style={{ width, height: WHEEL_ITEM_HEIGHT * WHEEL_VISIBLE_ROWS }}>
      <Animated.ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={WHEEL_ITEM_HEIGHT}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{ paddingVertical: PAD }}
      >
        {data.map((label, i) => {
          const inputRange = [
            (i - 2) * WHEEL_ITEM_HEIGHT,
            (i - 1) * WHEEL_ITEM_HEIGHT,
            i * WHEEL_ITEM_HEIGHT,
            (i + 1) * WHEEL_ITEM_HEIGHT,
            (i + 2) * WHEEL_ITEM_HEIGHT,
          ];
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.25, 0.5, 1, 0.5, 0.25],
            extrapolate: "clamp",
          });
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.6, 0.8, 1, 0.8, 0.6],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={[styles.item, { opacity, transform: [{ scale }] }]}
            >
              <Text style={[styles.text, { textAlign: align }]}>{label}</Text>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: WHEEL_ITEM_HEIGHT,
    justifyContent: "center",
  },
  text: {
    width: "100%",
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    color: Colors.white,
  },
});
