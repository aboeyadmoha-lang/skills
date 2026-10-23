import { Audio } from "@remotion/media";
import { interpolate, staticFile, useVideoConfig } from "remotion";
import { T, VO_SPANS } from "./timeline";

// Music bed level: dips under the voiceover, then fades out before the
// original logo lockup, which brings its own sound.
const bedVolume = (seconds: number) => {
  const distance = Math.min(
    ...VO_SPANS.map(([a, b]) =>
      seconds < a ? a - seconds : seconds > b ? seconds - b : 0,
    ),
  );
  const duck = interpolate(distance, [0, 0.35], [0.2, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(
    seconds,
    [T.lockupStart - 1.0, T.lockupStart + 0.2],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return duck * out;
};

// Effects: Kenney UI sounds (CC0); bed, riser and shimmer are composed for
// this video. See public/sfx/CREDITS.md.
export const Soundtrack: React.FC = () => {
  const { fps } = useVideoConfig();
  const sfx = (name: string, file: string, at: number, volume: number) => (
    <Audio
      name={name}
      src={staticFile(`sfx/${file}.wav`)}
      from={Math.round(at * fps)}
      volume={volume}
    />
  );
  // A soft lift as each line starts writing.
  const write = (name: string, [at]: readonly [number, number]) =>
    sfx(name, "maximize-008", at, 0.22);

  return (
    <>
      <Audio
        name="Music bed"
        src={staticFile("sfx/bed.wav")}
        durationInFrames={Math.round((T.lockupStart + 0.3) * fps)}
        volume={(f) => bedVolume(f / fps)}
      />
      {sfx("Logo reveal", "maximize-004", T.intro.logo, 0.4)}
      {write("Write: audience", T.intro.audience)}
      {write("Write: title", T.intro.title)}
      {sfx("To map", "riser", T.mapStart - 1.2, 0.35)}
      {write("Write: platform", T.platform.title)}
      {write("Write: platform accent", T.platform.accent)}
      {sfx("Tag", "tick-004", T.riyadh.tag, 0.35)}
      {sfx("Riyadh point", "notification-pop", T.riyadh.dot, 0.45)}
      {write("Write: Riyadh accent", T.riyadh.accent)}
      {sfx("Riyadh fill", "maximize-004", T.riyadh.fill, 0.35)}
      {write("Write: next", T.next.title)}
      {sfx("West point", "glass-002", T.next.westPoint, 0.4)}
      {sfx("East point", "glass-002", T.next.eastPoint, 0.4)}
      {sfx("East fill", "maximize-004", T.next.eastPoint + 0.05, 0.3)}
      {write("Write: later", T.later.title)}
      {sfx("Kingdom light", "shimmer", T.later.sweep, 0.45)}
      {sfx("To outro", "riser", T.outroStart - 1.2, 0.35)}
      {write("Write: follow", T.outro.cta)}
      {write("Write: soon", T.outro.status)}
      {sfx("Website", "select-007", T.outro.site, 0.35)}
    </>
  );
};
