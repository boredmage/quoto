export type PersonalizeQuestion = {
  key: string;
  title: string;
  subtitle: string;
  options: string[];
};

/** The 7 single-select question steps (step 8 is the reminders screen). */
export const PERSONALIZE_QUESTIONS: PersonalizeQuestion[] = [
  {
    key: "source",
    title: "How did you hear about Quoto?",
    subtitle: "Select an option to continue",
    options: [
      "TikTok",
      "Instagram",
      "Facebook",
      "Google Play",
      "Web search",
      "Friend / Family",
      "Other",
    ],
  },
  {
    key: "gender",
    title: "Which option represents you best?",
    subtitle: "Some quotes & affirmations will use your gender or pronouns",
    options: ["Male", "Female", "Others", "Prefer not to say"],
  },
  {
    key: "age",
    title: "How old are you?",
    subtitle: "Your age used to personalize your content?",
    options: ["13 to 17", "18 to 24", "25 to 34", "45 to 54", "55+"],
  },
  {
    key: "religious",
    title: "Are you religious?",
    subtitle:
      "This information will be used to tailor you quotes & affirmations to your beliefs",
    options: ["Yes", "No", "Spiritual but no religious"],
  },
  {
    key: "beliefs",
    title: "Which of these best describe your beliefs?",
    subtitle:
      "This information will be used to personalize your quotes & affirmations",
    options: [
      "Islam",
      "Christianity",
      "Judaism",
      "Hinduism",
      "Buddism",
      "Other",
    ],
  },
  {
    key: "relationship",
    title: "Get quotes that fit your relationship status",
    subtitle: "Choose the option that describe it the best",
    options: [
      "In a happy relationship",
      "In a challenging relationship",
      "Happily single",
      "Single and open to connection",
      "In a challenging relationship",
      "Not interested in this topic",
    ],
  },
  {
    key: "time",
    title: "How much time will you devote to app?",
    subtitle: "You can change your goal later",
    options: ["1 minute a day", "3 minutes a day", "10 minutes a day"],
  },
];

/** 7 questions + 1 reminders step. */
export const TOTAL_PERSONALIZE_STEPS = PERSONALIZE_QUESTIONS.length + 1;
