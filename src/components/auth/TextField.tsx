import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from "react-native";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { EyeIcon, EyeOffIcon } from "../icons";

type TextFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  /** Render as a password field with a show/hide toggle. */
  password?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
};

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  password = false,
  keyboardType,
  autoCapitalize,
}: TextFieldProps) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.textVariant}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={password && hidden}
          keyboardType={keyboardType}
          autoCapitalize={password ? "none" : autoCapitalize}
          autoCorrect={!password}
        />
        {password && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
          >
            {hidden ? <EyeOffIcon /> : <EyeIcon />}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    fontFamily: Fonts.inter.medium,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.text,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 52,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    color: Colors.text,
    padding: 0,
  },
});
