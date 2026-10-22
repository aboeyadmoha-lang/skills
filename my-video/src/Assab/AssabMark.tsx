import { Img, staticFile } from "remotion";
import { DISPLAY } from "./theme";

// The original "A" mark. Until the real logo file is provided, a clearly
// marked placeholder is drawn in its place. Drop the file at
// public/assab/logo.svg and set `src="assab/logo.svg"` to use it.
export const AssabMark: React.FC<{
  readonly size: number;
  readonly color: string;
  readonly src?: string;
}> = ({ size, color, src }) => {
  if (src) {
    return (
      <Img
        src={staticFile(src)}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${Math.max(2, size / 60)}px dashed ${color}`,
        borderRadius: size * 0.18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: size * 0.62,
        color,
        lineHeight: 1,
      }}
    >
      A
    </div>
  );
};
