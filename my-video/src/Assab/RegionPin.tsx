import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND_DARK, TEXT } from "./theme";

// A landmark card standing upright on a map point. It lives inside the tilted
// map plane and counter-rotates so it faces the viewer.
export const RegionPin: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly tilt: number;
  readonly label: string;
  readonly at: number;
  readonly children: React.ReactNode;
}> = ({ x, y, tilt, label, at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = interpolate(frame, [at * fps, (at + 0.45) * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.4, 0.64, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 150,
        translate: "-50% -100%",
        transformOrigin: "50% 100%",
        rotate: `x ${-tilt}deg`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: Math.min(1, pop * 1.5),
        scale: interpolate(pop, [0, 1], [0.4, 1]),
      }}
    >
      <div
        style={{
          width: 150,
          padding: "16px 0 12px",
          borderRadius: 30,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 18px 40px rgba(58,45,125,0.20)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {children}
        <div
          dir="rtl"
          lang="ar"
          style={{
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 32,
            color: BRAND_DARK,
          }}
        >
          {label}
        </div>
      </div>
      <div style={{ width: 3, height: 46, backgroundColor: BRAND_DARK }} />
    </div>
  );
};
