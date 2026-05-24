import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import { ScreenHeader } from "../components/ScreenHeader";
import { CATEGORIES } from "../constants/categories";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

/**
 * "Topics you follow" — the same category grid as Discover, reached from the
 * profile settings list.
 */
export default function TopicsFollow() {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 16) / 2;

  return (
    <View style={styles.root}>
      <ScreenHeader title="Topics you follow" />

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((c) => (
          <View key={c.name} style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.cardTitle}>{c.name}</Text>
            <Pressable style={styles.iconButton}>
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
            </Pressable>
          </View>
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
