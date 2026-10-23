import { Interactive } from "remotion";
import { AssabMark } from "./AssabMark";
import { BRAND_CYAN, DISPLAY, LAVENDER, TEXT } from "./theme";
import { T } from "./timeline";
import { WriteOn } from "./WriteOn";

const IntroSceneInner = ({
  title,
  accent,
  audience,
}: {
  readonly title: string;
  readonly accent: string;
  readonly audience: string;
}) => {
  const [audienceAt, audienceDur] = T.intro.audience;
  const [titleAt, titleDur] = T.intro.title;

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
        <AssabMark height={200} variant="white" revealAt={T.intro.logo} />
      </div>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 1040,
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
            lineHeight: 1.25,
            color: "#FFFFFF",
          }}
        >
          <WriteOn text={title} at={titleAt} dur={titleDur * 0.45} />{" "}
          <WriteOn
            text={accent}
            at={titleAt + titleDur * 0.45}
            dur={titleDur * 0.55}
            style={{ color: BRAND_CYAN }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Audience"
          style={{
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 60,
            marginTop: 24,
            color: LAVENDER,
          }}
        >
          <WriteOn text={audience} at={audienceAt} dur={audienceDur} />
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
    title: { type: "string", default: "عصـــب", description: "Title" },
    accent: { type: "string", default: "قريـــبًا", description: "Accent" },
    audience: {
      type: "string",
      default: "لأصحـــاب المطـــاعم",
      description: "Audience line",
    },
  },
});
