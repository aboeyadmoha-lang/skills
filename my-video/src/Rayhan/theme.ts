import { loadFont } from "@remotion/google-fonts/Amiri";

export const { fontFamily: amiri } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["arabic"],
});

export const GOLD = "#D4AF37";
export const GOLD_LIGHT = "#F7E7A6";
export const GOLD_DARK = "#8A6A1E";
export const BLACK = "#070605";

// Metallic gold fill for text, used with background-clip: text.
export const goldTextGradient = `linear-gradient(100deg, ${GOLD_DARK} 0%, ${GOLD} 30%, ${GOLD_LIGHT} 50%, ${GOLD} 70%, ${GOLD_DARK} 100%)`;
