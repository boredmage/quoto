import { useRef, useState } from "react";
import {
  PanResponder,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from "react-native";

import { Colors } from "../../constants/colors";

const THUMB = 16;
const TRACK_HEIGHT = 4;

type SliderProps = {
  value: number;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  onValueChange: (value: number) => void;
};

/**
 * Pure-JS slider (no native module) styled to match the Figma reminders design:
 * a thin track with a white fill and a white circular thumb.
 */
export function Slider({
  value,
  minimumValue,
  maximumValue,
  step = 1,
  onValueChange,
}: SliderProps) {
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);
  const leftRef = useRef(0);
  const viewRef = useRef<View>(null);

  const range = maximumValue - minimumValue || 1;
  const ratio = Math.max(0, Math.min(1, (value - minimumValue) / range));

  const updateFromX = (pageX: number) => {
    const w = widthRef.current;
    if (w <= 0) return;
    const x = pageX - leftRef.current;
    const p = Math.max(
      0,
      Math.min(1, (x - THUMB / 2) / Math.max(1, w - THUMB)),
    );
    let next = minimumValue + p * range;
    next = Math.round(next / step) * step;
    next = Math.max(minimumValue, Math.min(maximumValue, next));
    if (next !== value) onValueChange(next);
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const pageX = e.nativeEvent.pageX;
        viewRef.current?.measureInWindow((x) => {
          leftRef.current = x;
          updateFromX(pageX);
        });
      },
      onPanResponderMove: (e) => updateFromX(e.nativeEvent.pageX),
    }),
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    widthRef.current = w;
    setWidth(w);
  };

  const usable = Math.max(0, width - THUMB);

  return (
    <View
      ref={viewRef}
      style={styles.container}
      onLayout={onLayout}
      {...responder.panHandlers}
    >
      <View style={styles.track} />
      <View style={[styles.fill, { width: ratio * usable + THUMB / 2 }]} />
      <View style={[styles.thumb, { left: ratio * usable }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    left: 0,
    right: 0,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: Colors.dotInactive,
  },
  fill: {
    position: "absolute",
    left: 0,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: Colors.white,
  },
  thumb: {
    position: "absolute",
    top: (20 - THUMB) / 2,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: Colors.white,
  },
});
