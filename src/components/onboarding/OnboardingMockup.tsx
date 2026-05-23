import { Image, View, type ImageSourcePropType } from "react-native";

type OnboardingMockupProps = {
  image: ImageSourcePropType;
  width: number;
  height: number;
  /** Y of the meniscus sheet's top edge — the mockup is centred on it so its
   * lower half is tucked behind the dark panel. */
  sheetTop: number;
  topInset: number;
};

/**
 * One page of the sliding carousel — just the phone mockup on the orange
 * background, positioned so roughly half of it shows above the meniscus sheet
 * and the rest is hidden behind it.
 */
export function OnboardingMockup({
  image,
  width,
  height,
  sheetTop,
  topInset,
}: OnboardingMockupProps) {
  const imgWidth = width * 0.72;
  const imgHeight = height * 0.72;
  const top = Math.max(topInset + 4, sheetTop - imgHeight / 2);

  return (
    <View style={{ width, height }}>
      <Image
        source={image}
        resizeMode="contain"
        style={{
          position: "absolute",
          top,
          left: (width - imgWidth) / 2,
          width: imgWidth,
          height: imgHeight,
        }}
      />
    </View>
  );
}
