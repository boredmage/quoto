import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AuthHeader } from "../components/auth/AuthHeader";
import { Checkbox } from "../components/auth/Checkbox";
import { OrDivider } from "../components/auth/OrDivider";
import { SocialRow } from "../components/auth/SocialRow";
import { TextField } from "../components/auth/TextField";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

export default function SignIn() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <AuthHeader />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heading}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Let’s dive into your account</Text>
          </View>

          <View style={styles.form}>
            <TextField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              password
            />

            <View style={styles.actions}>
              <Checkbox checked={remember} onChange={setRemember}>
                <Text style={styles.remember}>Remember me</Text>
              </Checkbox>
              <Pressable hitSlop={8} onPress={() => {}}>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </Pressable>
            </View>

            <PrimaryButton
              title="Sign In"
              onPress={() => router.replace("/home")}
            />
          </View>

          <OrDivider />
          <SocialRow />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text
            style={styles.footerLink}
            onPress={() => router.push("/sign-up")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },
  heading: {
    gap: 8,
  },
  title: {
    fontFamily: Fonts.inter.bold,
    fontSize: 24,
    lineHeight: 24 * 1.4,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.textVariant,
  },
  form: {
    gap: 24,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  remember: {
    fontFamily: Fonts.inter.regular,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.white,
  },
  forgot: {
    fontFamily: Fonts.inter.medium,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.textVariant,
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  footerText: {
    fontFamily: Fonts.inter.regular,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.textVariant,
    textAlign: "center",
  },
  footerLink: {
    fontFamily: Fonts.inter.medium,
    color: Colors.brand,
  },
});
