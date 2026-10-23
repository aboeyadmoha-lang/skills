import { Audio } from "@remotion/media";
import { staticFile, useVideoConfig } from "remotion";
import { makeBedVolume } from "../Soundtrack";
import { T2, VO_SPANS_2 } from "./timeline";

const bedVolume = makeBedVolume(VO_SPANS_2, T2.lockupStart);

export const Soundtrack2: React.FC = () => {
  const { fps } = useVideoConfig();
  const sfx = (name: string, file: string, at: number, volume: number) => (
    <Audio
      name={name}
      src={staticFile(`sfx/${file}.wav`)}
      from={Math.round(at * fps)}
      volume={volume}
    />
  );
  const write = (name: string, [at]: readonly [number, number]) =>
    sfx(name, "maximize-008", at, 0.22);

  return (
    <>
      <Audio
        name="Music bed"
        src={staticFile("sfx/bed.wav")}
        durationInFrames={Math.round((T2.lockupStart + 0.3) * fps)}
        volume={(f) => bedVolume(f / fps)}
      />
      {sfx("Mark", "maximize-004", T2.restaurant.mark, 0.35)}
      {write("Write: end of day", T2.restaurant.title)}
      {write("Write: income", T2.restaurant.income)}
      {write("Write: spend", T2.restaurant.spend)}
      {sfx("To desk", "riser", T2.deskStart - 1.0, 0.3)}
      {write("Write: review", T2.desk.review)}
      {sfx("Mark 1", "tick-004", 6.2, 0.35)}
      {sfx("Mark 2", "tick-004", 7.6, 0.35)}
      {sfx("Mark 3", "tick-004", 8.9, 0.35)}
      {sfx("Widen", "shimmer", T2.desk.stop, 0.35)}
      {write("Write: understand", T2.desk.understand)}
      {sfx("To brand", "riser", T2.brandStart - 1.0, 0.35)}
      {sfx("Brand mark", "maximize-004", T2.brand.mark, 0.4)}
      {write("Write: title", T2.brand.title)}
      {write("Write: line", T2.brand.line)}
      {sfx("To end card", "riser", T2.endStart - 1.0, 0.3)}
      {write("Write: follow", T2.endCard.cta)}
      {write("Write: soon", T2.endCard.status)}
      {write("Write: Riyadh", T2.endCard.start)}
      {sfx("Website", "select-007", T2.endCard.site, 0.35)}
    </>
  );
};
