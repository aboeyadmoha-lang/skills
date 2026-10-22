import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { useVideoConfig } from "remotion";
import { GoldBackground } from "./GoldBackground";
import { IntroScene } from "./IntroScene";
import { OutroScene } from "./OutroScene";
import { TaglineScene } from "./TaglineScene";

// 5s + 6s + 5s - 2 × 0.5s fades = 15s
export const RayhanPromo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      <GoldBackground />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Intro" durationInFrames={5 * fps}>
          <IntroScene
            name="Intro"
            brand="ريحان"
            subtitle="عطور"
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 0.5 * fps })}
        />
        <TransitionSeries.Sequence name="Tagline" durationInFrames={6 * fps}>
          <TaglineScene
            name="Tagline"
            tagline="عطرك يحكي عنك"
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 0.5 * fps })}
        />
        <TransitionSeries.Sequence name="Outro" durationInFrames={5 * fps}>
          <OutroScene
            name="Outro"
            brand="ريحان"
            tagline="عطرك يحكي عنك"
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
