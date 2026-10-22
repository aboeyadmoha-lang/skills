import {
  AbsoluteFill,
  Interactive,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BLACK, GOLD, GOLD_LIGHT } from "./theme";

const PARTICLE_COUNT = 40;

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill>
      {new Array(PARTICLE_COUNT).fill(true).map((_, i) => {
        const x = random(`x-${i}`) * width;
        const size = 3 + random(`s-${i}`) * 7;
        const speed = 0.6 + random(`v-${i}`) * 1.6;
        const offset = random(`o-${i}`) * height;
        const y = height - ((frame * speed + offset) % (height + 40));
        const twinkle = 0.25 + 0.75 * Math.abs(Math.sin(frame / 20 + i));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? GOLD_LIGHT : GOLD,
              opacity: twinkle * 0.7,
              boxShadow: `0 0 ${size * 3}px ${GOLD}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Glow: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Gold glow"
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at 50% 45%, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0.08) 35%, rgba(0,0,0,0) 65%)`,
        opacity: interpolate(frame, [0, 30, 225, 450], [0, 0.8, 1, 0.8], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    />
  );
};

export const GoldBackground: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BLACK }}>
      <Glow />
      <Particles />
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
