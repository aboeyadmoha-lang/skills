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

export const PURPLE_DEEP = "#1B0938";
export const PURPLE = "#3A1C71";
export const VIOLET = "#6D3FE0";
export const LAVENDER = "#C9B8FF";
export const SURFACE = "#F6F3FB";
export const LAND = "#E4DCF4";
