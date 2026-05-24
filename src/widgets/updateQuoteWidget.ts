/** Must match the widget `id` registered in the Voltra plugin (app.json). */
export const QUOTE_WIDGET_ID = "quotes";

/**
 * Pushes a quote to the home-screen widget. Lazy-requires Voltra and the
 * widget JSX builder so that this module — and every module that imports it —
 * stays evaluatable in binaries that don't include the Voltra native module
 * (Expo Go, or any dev/prod build made before adding Voltra). In those cases
 * Voltra's module-load throws "Cannot find native module 'VoltraModule'" and
 * we silently no-op. iOS-only by design.
 */
export async function updateQuoteWidget(text: string, author: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { updateWidget } = require("voltra/client");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { quoteWidgetVariants } = require("./quoteWidget");
    await updateWidget(QUOTE_WIDGET_ID, quoteWidgetVariants(text, author), {
      deepLinkUrl: "quoto://home",
    });
  } catch {
    // Voltra not present in this binary — no-op so the host screen keeps
    // working. Rebuild the dev client (expo prebuild + expo run:ios) to enable
    // widget updates.
  }
}
