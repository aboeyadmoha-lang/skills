import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND_CYAN, DISPLAY, TEXT } from "./theme";

// Call to action on the dark background, as in the latest Assab video.
// The logo lockup that follows is the original closing, used as is.
const OutroSceneInner = ({
  cta,
  status,
  website,
}: {
  readonly cta: string;
  readonly status: string;
  readonly website: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = (from: number) =>
    interpolate(frame, [from * fps, (from + 0.45) * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

  return (
    <div style={{ textAlign: "center", padding: "0 80px" }}>
      <Interactive.Div
        name="Call to action"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontSize: 124,
          lineHeight: 1.2,
          color: "#FFFFFF",
          opacity: fadeIn(0.2),
        }}
      >
        {cta}
        <br />
        <span style={{ color: BRAND_CYAN, opacity: fadeIn(0.6) }}>
          {status}
        </span>
      </Interactive.Div>
      <Interactive.Div
        name="Website"
        dir="ltr"
        style={{
          fontFamily: TEXT,
          fontWeight: 500,
          fontSize: 50,
          marginTop: 70,
          color: "#FFFFFF",
          opacity: fadeIn(1.0),
        }}
      >
        {website}
      </Interactive.Div>
    </div>
  );
};

export const OutroScene = Interactive.create({
  Component: OutroSceneInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    cta: {
      type: "string",
      default: "تابعوا عصب.",
      description: "Call to action",
    },
    status: { type: "string", default: "قريبًا.", description: "Status" },
    website: { type: "string", default: "Assab.io", description: "Website" },
  },
});
