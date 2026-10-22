import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssabMark } from "./AssabMark";
import { DISPLAY, LAVENDER, TEXT } from "./theme";

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
    interpolate(frame, [from * fps, (from + 0.6) * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(0.3),
        }}
      >
        <AssabMark size={300} color="#FFFFFF" />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1080,
          left: 90,
          right: 90,
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Call to action"
          dir="rtl"
          lang="ar"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: 130,
            lineHeight: 1.25,
            color: "#FFFFFF",
            opacity: fadeIn(0.9),
          }}
        >
          {cta}
        </Interactive.Div>
        <Interactive.Div
          name="Status"
          dir="rtl"
          lang="ar"
          style={{
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 64,
            marginTop: 16,
            color: LAVENDER,
            opacity: fadeIn(1.4),
          }}
        >
          {status}
        </Interactive.Div>
        <Interactive.Div
          name="Website"
          dir="ltr"
          style={{
            fontFamily: TEXT,
            fontWeight: 400,
            fontSize: 54,
            marginTop: 70,
            color: "#FFFFFF",
            opacity: fadeIn(1.9),
          }}
        >
          {website}
        </Interactive.Div>
      </div>
    </>
  );
};

export const OutroScene = Interactive.create({
  Component: OutroSceneInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    cta: {
      type: "string",
      default: "تابعوا عصب",
      description: "Call to action",
    },
    status: { type: "string", default: "قريبًا", description: "Status" },
    website: { type: "string", default: "Assab.io", description: "Website" },
  },
});
