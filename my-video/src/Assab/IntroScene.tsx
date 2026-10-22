import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "./AssabMark";
import { DISPLAY, LAVENDER, TEXT } from "./theme";

const IntroSceneInner = ({
  title,
  audience,
}: {
  readonly title: string;
  readonly audience: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {/* Logo only fades in; it is never scaled or distorted. */}
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [0, 0.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AssabMark size={300} color="#FFFFFF" />
      </div>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 1110,
          left: 90,
          right: 90,
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Title"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 140,
            lineHeight: 1.25,
            color: "#FFFFFF",
            opacity: interpolate(frame, [1.6 * fps, 2.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [1.6 * fps, 2.3 * fps],
              ["0px 30px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          {title}
        </Interactive.Div>
        <Interactive.Div
          name="Audience"
          style={{
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 60,
            marginTop: 20,
            color: LAVENDER,
            opacity: interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
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
    title: { type: "string", default: "عصب قريبًا", description: "Title" },
    audience: {
      type: "string",
      default: "لأصحاب المطاعم",
      description: "Audience line",
    },
  },
});
