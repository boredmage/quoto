import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnswerOption } from "../components/personalize/AnswerOption";
import { PersonalizeHeader } from "../components/personalize/PersonalizeHeader";
import { ReminderStep } from "../components/personalize/ReminderStep";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import {
  PERSONALIZE_QUESTIONS,
  TOTAL_PERSONALIZE_STEPS,
} from "../constants/personalize";

export default function Personalize() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const lastStep = TOTAL_PERSONALIZE_STEPS - 1;
  const isReminders = step === PERSONALIZE_QUESTIONS.length;
  const question = isReminders ? null : PERSONALIZE_QUESTIONS[step];

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else router.back();
  };

  const advance = () => {
    if (step < lastStep) setStep((s) => s + 1);
    else router.replace("/home");
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <PersonalizeHeader
        total={TOTAL_PERSONALIZE_STEPS}
        current={step}
        onBack={goBack}
        onSkip={advance}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heading}>
          <Text style={styles.title}>
            {isReminders ? "Let’s set your reminders" : question!.title}
          </Text>
          <Text style={styles.subtitle}>
            {isReminders
              ? "Small doses of motivation can make big difference in your life"
              : question!.subtitle}
          </Text>
        </View>

        {isReminders ? (
          <ReminderStep />
        ) : (
          <View style={styles.options}>
            {question!.options.map((option, i) => (
              <AnswerOption
                key={i}
                label={option}
                selected={answers[step] === i}
                onPress={() => setAnswers((a) => ({ ...a, [step]: i }))}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <PrimaryButton
          title={isReminders ? "Allow and save" : "Next"}
          onPress={advance}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
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
  options: {
    gap: 12,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
