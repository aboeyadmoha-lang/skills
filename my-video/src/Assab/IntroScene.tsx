import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "./AssabMark";
import { BRAND_CYAN, DISPLAY, LAVENDER, TEXT } from "./theme";

const IntroSceneInner = ({
  title,
  accent,
  audience,
}: {
  readonly title: string;
  readonly accent: string;
  readonly audience: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeUp = (from: number) => ({
    opacity: interpolate(frame, [from * fps, (from + 0.45) * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    translate: `0px ${interpolate(
      frame,
      [from * fps, (from + 0.45) * fps],
      [24, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      },
    )}px`,
  });

  return (
    <>
      {/* Mark sits alone with its protection area; revealed by a mask only. */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AssabMark height={200} variant="white" revealAt={0.2} />
      </div>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 1060,
          left: 80,
          right: 80,
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Title"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 132,
            lineHeight: 1.2,
            color: "#FFFFFF",
            ...fadeUp(1.0),
          }}
        >
          {title} <span style={{ color: BRAND_CYAN }}>{accent}</span>
        </Interactive.Div>
        <Interactive.Div
          name="Audience"
          style={{
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 60,
            marginTop: 24,
            color: LAVENDER,
            ...fadeUp(0.6),
          }}
        >
          {audience}
        </Interactive.Div>
      </div>
    </>
  );
};

export const IntroScene = Interactive.create({
  Component: IntroSceneInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    title: { type: "string", default: "عصب", description: "Title" },
    accent: { type: "string", default: "قريبًا", description: "Accent" },
    audience: {
      type: "string",
      default: "لأصحاب المطاعم",
      description: "Audience line",
    },
  },
});
