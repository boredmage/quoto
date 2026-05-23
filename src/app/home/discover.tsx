import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { CATEGORIES } from "../../constants/categories";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

export default function Discover() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 16) / 2;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Explore topics</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((c) => (
          <Pressable key={c.name} style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.cardTitle}>{c.name}</Text>
            <View style={styles.iconButton}>
              <Svg
                width={24}
                height={24}
                viewBox={c.viewBox ?? "0 0 24 24"}
                fill="none"
              >
                <Path
                  d={c.path}
                  stroke={Colors.white}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: Colors.white,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 16,
  },
  cardTitle: {
    width: "100%",
    fontFamily: Fonts.inter.medium,
    fontSize: 16,
    color: Colors.white,
  },
  iconButton: {
    alignSelf: "flex-end",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.onSurface,
  },
});
