import { Audio } from "@remotion/media";
import { interpolate, staticFile, useVideoConfig } from "remotion";
import { T, VO_SPANS } from "./timeline";

// Background bed level: dips under the voiceover, then fades out before the
// original logo lockup, which brings its own sound.
const bedVolume = (seconds: number) => {
  const distance = Math.min(
    ...VO_SPANS.map(([a, b]) =>
      seconds < a ? a - seconds : seconds > b ? seconds - b : 0,
    ),
  );
  const duck = interpolate(distance, [0, 0.3], [0.16, 0.42], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(
    seconds,
    [T.lockupStart - 0.8, T.lockupStart + 0.2],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return duck * out;
};

export const Soundtrack: React.FC = () => {
  const { fps } = useVideoConfig();
  const sfx = (name: string) => staticFile(`sfx/${name}.wav`);
  const write = (name: string, [at, dur]: readonly [number, number]) => (
    <Audio
      name={name}
      src={sfx("write")}
      from={Math.round(at * fps)}
      durationInFrames={Math.round(dur * fps)}
      volume={0.14}
    />
  );
  const hit = (name: string, file: string, at: number, volume: number) => (
    <Audio
      name={name}
      src={sfx(file)}
      from={Math.round(at * fps)}
      volume={volume}
    />
  );

  return (
    <>
      <Audio
        name="Tech bed"
        src={sfx("bed")}
        durationInFrames={Math.round((T.lockupStart + 0.3) * fps)}
        volume={(f) => bedVolume(f / fps)}
      />
      {hit("Logo reveal", "fill", T.intro.logo, 0.35)}
      {write("Write: audience", T.intro.audience)}
      {write("Write: title", T.intro.title)}
      {hit("To map", "whoosh", T.mapStart - 0.5, 0.5)}
      {write("Write: platform", T.platform.title)}
      {write("Write: platform accent", T.platform.accent)}
      {hit("Tag", "tick", T.riyadh.tag, 0.3)}
      {hit("Riyadh point", "pop", T.riyadh.dot, 0.45)}
      {write("Write: Riyadh", T.riyadh.title)}
      {write("Write: Riyadh accent", T.riyadh.accent)}
      {hit("Riyadh fill", "fill", T.riyadh.fill, 0.4)}
      {hit("Riyadh pin", "icon", T.riyadh.pin, 0.35)}
      {write("Write: next", T.next.title)}
      {write("Write: next accent", T.next.accent)}
      {hit("Line west", "line", T.next.westLine, 0.5)}
      {hit("West point", "pop", T.next.westPoint, 0.4)}
      {hit("West pin", "icon", T.next.westPoint + 0.15, 0.3)}
      {hit("Line east", "line", T.next.eastLine, 0.5)}
      {hit("East point", "pop", T.next.eastPoint, 0.4)}
      {hit("East fill", "fill", T.next.eastPoint, 0.3)}
      {hit("East pin", "icon", T.next.eastPoint + 0.15, 0.3)}
      {write("Write: later", T.later.title)}
      {write("Write: later accent", T.later.accent)}
      {hit("Kingdom light", "fill", T.later.sweep, 0.45)}
      {hit("To outro", "whoosh", T.outroStart - 0.5, 0.5)}
      {write("Write: follow", T.outro.cta)}
      {write("Write: soon", T.outro.status)}
      {hit("Website", "tick", T.outro.site, 0.3)}
    </>
  );
};
