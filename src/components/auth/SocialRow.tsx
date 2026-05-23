import { Pressable, StyleSheet, View } from "react-native";

import { Colors } from "../../constants/colors";
import { AppleIcon, FacebookIcon, GoogleIcon, TwitterIcon } from "../icons";

const PROVIDERS = [
  { key: "google", Icon: GoogleIcon },
  { key: "apple", Icon: AppleIcon },
  { key: "twitter", Icon: TwitterIcon },
  { key: "facebook", Icon: FacebookIcon },
] as const;

type SocialRowProps = {
  onPress?: (provider: (typeof PROVIDERS)[number]["key"]) => void;
};

export function SocialRow({ onPress }: SocialRowProps) {
  return (
    <View style={styles.row}>
      {PROVIDERS.map(({ key, Icon }) => (
        <Pressable
          key={key}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => onPress?.(key)}
          accessibilityRole="button"
          accessibilityLabel={`Continue with ${key}`}
        >
          <Icon size={24} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
