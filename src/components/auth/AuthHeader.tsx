import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { ArrowLeftIcon } from "../icons";

export function AuthHeader() {
  const router = useRouter();
  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <ArrowLeftIcon size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
