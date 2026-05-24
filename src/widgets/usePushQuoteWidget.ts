import { useEffect } from "react";
import { Platform } from "react-native";

import { useQuoteStyle } from "../store/quoteStyle";
import { updateQuoteWidget } from "./updateQuoteWidget";

/**
 * Keeps the home-screen widget(s) in sync with the current home quote *and*
 * the user's saved Customize style. Re-pushes whenever either changes.
 * iOS-only and a silent no-op in binaries without Voltra.
 */
export function usePushQuoteWidget(text: string, author: string) {
  const { style } = useQuoteStyle();

  useEffect(() => {
    if (Platform.OS !== "ios") return;
    updateQuoteWidget(text, author, style).catch(() => {});
  }, [text, author, style]);
}
