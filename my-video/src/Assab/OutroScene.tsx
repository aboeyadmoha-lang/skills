import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND_CYAN, DISPLAY, TEXT } from "./theme";
import { T } from "./timeline";
import { WriteOn } from "./WriteOn";

// Call to action on the dark background, as in the latest Assab video.
// The logo lockup that follows is the original closing, used as is.
const local = (globalSeconds: number) => globalSeconds - T.outroStart;

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
  const siteAt = local(T.outro.site);

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
          lineHeight: 1.25,
          color: "#FFFFFF",
        }}
      >
        <WriteOn text={cta} at={local(T.outro.cta[0])} dur={T.outro.cta[1]} />
        <br />
        <WriteOn
          text={status}
          at={local(T.outro.status[0])}
          dur={T.outro.status[1]}
          style={{ color: BRAND_CYAN }}
        />
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
          opacity: interpolate(
            frame,
            [siteAt * fps, (siteAt + 0.4) * fps],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
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
      default: "تابـــعوا عصـــب.",
      description: "Call to action",
    },
    status: { type: "string", default: "قريـــبًا.", description: "Status" },
    website: { type: "string", default: "Assab.io", description: "Website" },
  },
});
