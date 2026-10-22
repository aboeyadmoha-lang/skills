import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const DISPLAY = "Thmanyah Serif Display";
export const TEXT = "Thmanyah Serif Text";

loadFont({
  family: DISPLAY,
  url: staticFile("assab/fonts/ThmanyahSerifDisplay-Bold.otf"),
  weight: "700",
});
for (const [file, weight] of [
  ["Light", "300"],
  ["Regular", "400"],
  ["Medium", "500"],
  ["Bold", "700"],
  ["Black", "900"],
] as const) {
  loadFont({
    family: TEXT,
    url: staticFile(`assab/fonts/ThmanyahSerifText-${file}.otf`),
    weight,
  });
}

// Assab identity v04 palette.
export const BRAND_PURPLE = "#6E29F6";
export const BRAND_CYAN = "#01F6F7";
export const BRAND_DARK = "#3A2D7D";
// Backgrounds matched to the latest Assab video.
export const NIGHT = "#1A1146";
export const SURFACE = "#F4F2FA";
export const LAND = "#E5DFF6";
export const LAVENDER = "#C9B8FF";
