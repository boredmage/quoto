import { updateWidget } from "voltra/client";

import { quoteWidgetVariants } from "./quoteWidget";

/** Must match the widget `id` registered in the Voltra plugin (app.json). */
export const QUOTE_WIDGET_ID = "quotes";

/**
 * Pushes a quote to the home-screen widget. Call this whenever the app's
 * current quote changes so the installed widget(s) stay in sync. iOS-only and
 * requires a native (dev-client) build — see the Voltra setup notes.
 */
export async function updateQuoteWidget(text: string, author: string) {
  await updateWidget(QUOTE_WIDGET_ID, quoteWidgetVariants(text, author), {
    deepLinkUrl: "quoto://home",
  });
}
