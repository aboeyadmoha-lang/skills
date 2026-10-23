import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND_DARK, TEXT } from "./theme";

// A landmark that rises straight out of the tilted map at its point, with a
// soft contact shadow and a small name tag. It counter-rotates the map tilt
// so it stands upright facing the viewer.
export const RegionPin: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly tilt: number;
  readonly label: string;
  readonly at: number;
  readonly width: number;
  readonly children: React.ReactNode;
}> = ({ x, y, tilt, label, at, width, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = interpolate(frame, [at * fps, (at + 0.55) * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.45, 0.64, 1),
  });
  const tagIn = interpolate(
    frame,
    [(at + 0.35) * fps, (at + 0.7) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <>
      {/* Contact shadow lies flat on the map */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width * 0.9,
          height: width * 0.32,
          translate: "-50% -50%",
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(36,25,94,0.45), rgba(36,25,94,0))",
          opacity: Math.min(1, rise),
          scale: `${rise}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width,
          translate: "-50% -100%",
          transformOrigin: "50% 100%",
          rotate: `x ${-tilt}deg`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          dir="rtl"
          lang="ar"
          style={{
            padding: "6px 18px",
            borderRadius: 999,
            backgroundColor: BRAND_DARK,
            color: "#FFFFFF",
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 30,
            marginBottom: 8,
            opacity: tagIn,
            translate: `0px ${(1 - tagIn) * 12}px`,
          }}
        >
          {label}
        </div>
        <div
          style={{
            transformOrigin: "50% 100%",
            scale: `${Math.max(0.001, 0.6 + 0.4 * rise)} ${Math.max(0.001, rise)}`,
            opacity: Math.min(1, rise * 2),
            lineHeight: 0,
            // White rim keeps the landmark legible over filled regions.
            filter:
              "drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff)",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};
