import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TextField } from "../components/auth/TextField";
import { ArrowLeftIcon } from "../components/icons";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { useCollections } from "../store/collections";

export default function NewCollection() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { createCollection } = useCollections();
  const [name, setName] = useState("");

  const save = () => {
    const trimmed = name.trim();
    if (trimmed) createCollection(trimmed);
    router.back();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Pressable
          style={styles.back}
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityLabel="Go back"
        >
          <ArrowLeftIcon size={24} color={Colors.white} />
        </Pressable>
        <Text style={styles.title}>New collection</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <TextField
            label="Name of collection"
            placeholder="New collection"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
          <PrimaryButton title="Save" onPress={save} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  back: {
    position: "absolute",
    left: 16,
    top: 12,
  },
  title: {
    fontFamily: Fonts.inter.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: Colors.white,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
