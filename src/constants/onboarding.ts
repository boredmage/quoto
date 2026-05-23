import type { ImageSourcePropType } from "react-native";

export type OnboardingSlide = {
  key: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    key: "explore",
    title: "Explore the Most Powerful & Inspiring Quotes",
    subtitle:
      "Discover a handpicked collection of the best motivational and wisdom-filled quotes",
    image: require("../assets/images/onboarding/mockup-1.png"),
  },
  {
    key: "categories",
    title: "Choose Categories That Truly Inspire You",
    subtitle:
      "Select topics that resonate with you to receive personalized daily quotes",
    image: require("../assets/images/onboarding/mockup-2.png"),
  },
  {
    key: "customize",
    title: "Customize & Edit Quotes to Match Your Style",
    subtitle:
      "Change backgrounds, fonts, and color to create unique and shareable designs",
    image: require("../assets/images/onboarding/mockup-3.png"),
  },
  {
    key: "save",
    title: "Save, Organize & Revisit Your Favorite Quotes",
    subtitle:
      "Add inspiring quotes to your favorites and access them anytime for motivation",
    image: require("../assets/images/onboarding/mockup-4.png"),
  },
  {
    key: "premium",
    title: "Unlock More with Quoto Premium",
    subtitle:
      "Go ad-free and enjoy exclusive customization options for a seamless experience",
    image: require("../assets/images/onboarding/mockup-5.png"),
  },
];
