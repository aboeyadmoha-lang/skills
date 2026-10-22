import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { staticFile, Track, useVideoConfig } from "remotion";
import { IntroScene } from "./IntroScene";
import { MapScene } from "./MapScene";
import { OutroScene } from "./OutroScene";
import { PURPLE_DEEP, SURFACE } from "./theme";

// 4.2s + 22.6s + 6s - 2 × 0.4s fades = 32s.
// Each voiceover line is cut from the recording and placed at its scene.
export const AssabLaunch: React.FC = () => {
  const { fps } = useVideoConfig();
  const vo = staticFile("assab/voiceover.mp3");

  return (
    <>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Intro" durationInFrames={4.2 * fps}>
          <IntroScene
            name="Intro"
            title="عصب قريبًا"
            audience="لأصحاب المطاعم"
            style={{
              backgroundColor: PURPLE_DEEP,
              alignItems: "center",
            }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 0.4 * fps })}
        />
        <TransitionSeries.Sequence name="Map" durationInFrames={22.6 * fps}>
          <MapScene name="Map" style={{ backgroundColor: SURFACE }} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 0.4 * fps })}
        />
        <TransitionSeries.Sequence name="Outro" durationInFrames={6 * fps}>
          <OutroScene
            name="Outro"
            cta="تابعوا عصب"
            status="قريبًا"
            website="Assab.io"
            style={{
              backgroundColor: PURPLE_DEEP,
              alignItems: "center",
            }}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Track name="Voiceover">
        <Audio
          name="VO 1 – audience"
          src={vo}
          from={0.3 * fps}
          trimBefore={0.3 * fps}
          durationInFrames={3.45 * fps}
        />
        <Audio
          name="VO 2 – platform"
          src={vo}
          from={4.5 * fps}
          trimBefore={4.1 * fps}
          durationInFrames={3.95 * fps}
        />
        <Audio
          name="VO 3 – Riyadh"
          src={vo}
          from={9.3 * fps}
          trimBefore={8.45 * fps}
          durationInFrames={1.2 * fps}
        />
        <Audio
          name="VO 4 – next step"
          src={vo}
          from={12.4 * fps}
          trimBefore={9.8 * fps}
          durationInFrames={3.3 * fps}
        />
        <Audio
          name="VO 5 – all cities"
          src={vo}
          from={19.4 * fps}
          trimBefore={13.45 * fps}
          durationInFrames={3.7 * fps}
        />
        <Audio
          name="VO 6 – follow us"
          src={vo}
          from={26.6 * fps}
          trimBefore={17.6 * fps}
          durationInFrames={2.55 * fps}
        />
      </Track>
    </>
  );
};
