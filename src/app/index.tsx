import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MeniscusSheet } from "../components/onboarding/MeniscusSheet";
import { OnboardingMockup } from "../components/onboarding/OnboardingMockup";
import { Paginator } from "../components/onboarding/Paginator";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { ONBOARDING_SLIDES } from "../constants/onboarding";

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList<(typeof ONBOARDING_SLIDES)[number]>>(null);
  // The settled page. Updated as the scroll crosses each half-way point, so the
  // text content swaps while it is faded out (a crossfade rather than a slide).
  const [page, setPage] = useState(0);

  const lastIndex = ONBOARDING_SLIDES.length - 1;
  const isLast = page === lastIndex;
  const sheetHeight = Math.round(height * 0.52);

  useEffect(() => {
    const id = scrollX.addListener(({ value }) => {
      const next = Math.round(value / width);
      setPage((prev) => (next !== prev ? next : prev));
    });
    return () => scrollX.removeListener(id);
  }, [scrollX, width]);

  // Title/subtitle fade to 0 at the mid-point between pages and back to 1 once
  // settled, so the swap (which happens at the mid-point) is invisible.
  const textOpacity = useMemo(() => {
    const inputRange: number[] = [];
    const outputRange: number[] = [];
    for (let i = 0; i < ONBOARDING_SLIDES.length; i++) {
      inputRange.push(i * width);
      outputRange.push(1);
      if (i < lastIndex) {
        inputRange.push((i + 0.5) * width);
        outputRange.push(0);
      }
    }
    return scrollX.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp",
    });
  }, [scrollX, width, lastIndex]);

  const handleNext = () => {
    if (isLast) {
      router.push("/sign-in");
      return;
    }
    listRef.current?.scrollToIndex({ index: page + 1, animated: true });
  };

  const slide = ONBOARDING_SLIDES[page];

  return (
    <View style={[styles.root, { backgroundColor: Colors.brand }]}>
      <StatusBar style="light" />

      {/* Concentric halo behind the phone mockups (fixed) */}
      <View pointerEvents="none" style={[styles.halo, { top: height * 0.04 }]}>
        <View
          style={[styles.ring, { width: width * 1.5, height: width * 1.5 }]}
        >
          <View
            style={[
              styles.ringInner,
              { width: width * 1.05, height: width * 1.05 },
            ]}
          />
        </View>
      </View>

      {/* Sliding pager — only the phone mockups move */}
      <Animated.FlatList
        ref={listRef}
        style={StyleSheet.absoluteFill}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        getItemLayout={(_, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
        renderItem={({ item }) => (
          <OnboardingMockup
            image={item.image}
            width={width}
            height={height}
            sheetTop={height - sheetHeight}
            topInset={insets.top}
          />
        )}
      />

      {/* Fixed meniscus sheet with crossfading text */}
      <View
        pointerEvents="none"
        style={[styles.sheetWrap, { height: sheetHeight }]}
      >
        <MeniscusSheet width={width} height={sheetHeight}>
          <Animated.View style={{ opacity: textOpacity }}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </Animated.View>
        </MeniscusSheet>
      </View>

      {/* Fixed footer — dots + CTA (swipes pass through, button does not) */}
      <View
        pointerEvents="box-none"
        style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}
      >
        <Paginator
          count={ONBOARDING_SLIDES.length}
          scrollX={scrollX}
          slideWidth={width}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {isLast ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  halo: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  ring: {
    borderRadius: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  ringInner: {
    borderRadius: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  sheetWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    gap: 28,
  },
  button: {
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    color: Colors.black,
  },
  title: {
    fontFamily: Fonts.inter.bold,
    fontSize: 24,
    lineHeight: 24 * 1.4,
    textAlign: "center",
    color: Colors.text,
  },
  subtitle: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    textAlign: "center",
    color: Colors.textVariant,
    marginTop: 16,
  },
});
