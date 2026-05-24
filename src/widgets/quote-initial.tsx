import { type WidgetVariants } from "voltra";

import { CURRENT_QUOTE } from "../constants/quote";
import { quoteWidgetVariants } from "./quoteWidget";

// Pre-rendered content bundled into the widget at build time (referenced by
// `initialStatePath` in app.json), so the widget shows a quote as soon as it is
// added — before the app pushes any runtime update.
const initialState: WidgetVariants = quoteWidgetVariants(
  CURRENT_QUOTE.text,
  CURRENT_QUOTE.author,
);

export default initialState;
