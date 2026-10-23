import { BRAND_CYAN, BRAND_DARK, BRAND_PURPLE } from "./theme";

// Filled 2.5D landmarks in the identity's purples with cyan accents.
// Each sits on a 200 × 220 grid with its base centred at (100, 205);
// fronts are lit, right-hand faces fall into the darker purples.
const DEEP = "#24195E";
const LIGHT = "#9B6BFF";

// Riyadh: Al Masmak fortress, Najdi mud walls with stepped merlons.
export const MasmakIcon: React.FC<{ readonly width: number }> = ({ width }) => {
  const merlons = (x0: number, x1: number, y: number, size: number) => {
    const out: string[] = [];
    for (let x = x0; x + size <= x1 + 0.1; x += size) {
      out.push(
        `M${x} ${y} L${x + size / 2} ${y - size * 0.9} L${x + size} ${y} Z`,
      );
    }
    return out.join(" ");
  };

  return (
    <svg viewBox="0 0 200 220" width={width} height={width * 1.1}>
      {/* Walls */}
      <path d="M50 116 H150 V205 H50 Z" fill={LIGHT} />
      <path d="M150 116 L164 108 V197 L150 205 Z" fill={BRAND_DARK} />
      <path d={merlons(50, 150, 116, 12.5)} fill={LIGHT} />
      {/* Corner towers, slightly tapered */}
      <path d="M10 205 L17 74 H61 L68 205 Z" fill={BRAND_PURPLE} />
      <path d="M68 205 L61 74 L73 67 L80 198 Z" fill={DEEP} />
      <path d={merlons(17, 61, 74, 11)} fill={BRAND_PURPLE} />
      <path d="M126 205 L133 74 H177 L184 205 Z" fill={BRAND_PURPLE} />
      <path d="M184 205 L177 74 L189 67 L196 198 Z" fill={DEEP} />
      <path d={merlons(133, 177, 74, 11)} fill={BRAND_PURPLE} />
      {/* Triangle vents and the great door */}
      <path
        d="M80 140 l7 -10 l7 10 Z M106 140 l7 -10 l7 10 Z M32 118 l7 -10 l7 10 Z M148 118 l7 -10 l7 10 Z M32 150 l7 -10 l7 10 Z M148 150 l7 -10 l7 10 Z"
        fill={BRAND_CYAN}
      />
      <path d="M86 205 V170 Q100 156 114 170 V205 Z" fill={DEEP} />
      <path
        d="M86 205 V170 Q100 156 114 170 V205"
        fill="none"
        stroke={BRAND_CYAN}
        strokeWidth={3}
      />
    </svg>
  );
};

// Western region: a Historic Jeddah house with wooden rawashin.
export const JeddahHouseIcon: React.FC<{ readonly width: number }> = ({
  width,
}) => {
  const lattice = (x: number, y: number, w: number, h: number) => {
    const lines: string[] = [];
    for (let i = 1; i < 4; i++)
      lines.push(`M${x + (w * i) / 4} ${y + 4} V${y + h - 4}`);
    for (let j = 1; j < 5; j++)
      lines.push(`M${x + 4} ${y + (h * j) / 5} H${x + w - 4}`);
    return lines.join(" ");
  };
  const rawshan = (y: number) => (
    <>
      <path d={`M70 ${y} H122 V${y + 56} H70 Z`} fill={BRAND_CYAN} />
      <path
        d={`M122 ${y} L132 ${y - 6} V${y + 50} L122 ${y + 56} Z`}
        fill="#00B9C9"
      />
      <path d={lattice(70, y, 52, 56)} stroke={BRAND_DARK} strokeWidth={2.2} />
      <path
        d={`M66 ${y} H126`}
        stroke={BRAND_DARK}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <path
        d={`M66 ${y + 56} H126`}
        stroke={BRAND_DARK}
        strokeWidth={5}
        strokeLinecap="round"
      />
    </>
  );

  return (
    <svg viewBox="0 0 200 220" width={width} height={width * 1.1}>
      <path d="M50 30 H146 V205 H50 Z" fill={BRAND_PURPLE} />
      <path d="M146 30 L162 20 V195 L146 205 Z" fill={BRAND_DARK} />
      {/* Parapet with small crenels */}
      <path
        d="M50 30 V20 H60 V30 H70 V20 H80 V30 H90 V20 H100 V30 H110 V20 H120 V30 H130 V20 H140 V30 H146 V20 H50"
        fill={LIGHT}
      />
      {rawshan(46)}
      {rawshan(116)}
      {/* Side windows and door */}
      <path d="M56 70 h10 v22 h-10 Z M56 140 h10 v22 h-10 Z" fill={DEEP} />
      <path d="M86 205 V184 Q96 176 106 184 V205 Z" fill={DEEP} />
    </svg>
  );
};

// Eastern region: Ithra in Dhahran, stacked pebbles wrapped in steel bands.
export const IthraIcon: React.FC<{ readonly width: number }> = ({ width }) => {
  const bands = (x0: number, x1: number, y0: number, y1: number) => {
    const out: string[] = [];
    for (let y = y0; y <= y1; y += 14) out.push(`M${x0} ${y} H${x1}`);
    return out.join(" ");
  };

  return (
    <svg viewBox="0 0 200 220" width={width} height={width * 1.1}>
      <defs>
        <clipPath id="ithra-tower">
          <path d="M74 205 C64 150 72 70 98 18 C120 40 134 120 126 205 Z" />
        </clipPath>
        <clipPath id="ithra-left">
          <ellipse cx={58} cy={176} rx={46} ry={32} />
        </clipPath>
        <clipPath id="ithra-right">
          <ellipse cx={146} cy={180} rx={40} ry={27} />
        </clipPath>
      </defs>
      {/* Left and right pebbles */}
      <ellipse cx={58} cy={176} rx={46} ry={32} fill={BRAND_DARK} />
      <path
        d={bands(10, 106, 152, 206)}
        stroke={LIGHT}
        strokeWidth={3.5}
        clipPath="url(#ithra-left)"
      />
      <ellipse cx={146} cy={180} rx={40} ry={27} fill={DEEP} />
      <path
        d={bands(104, 188, 160, 206)}
        stroke={BRAND_PURPLE}
        strokeWidth={3.5}
        clipPath="url(#ithra-right)"
      />
      {/* The tall tower pebble */}
      <path
        d="M74 205 C64 150 72 70 98 18 C120 40 134 120 126 205 Z"
        fill={BRAND_PURPLE}
      />
      <path
        d="M106 205 C114 140 112 70 98 18 C120 40 134 120 126 205 Z"
        fill={BRAND_DARK}
      />
      <path
        d={bands(70, 130, 40, 204)}
        stroke={LIGHT}
        strokeWidth={3.5}
        clipPath="url(#ithra-tower)"
      />
      <path
        d="M86 70 C80 110 80 150 84 200"
        stroke={BRAND_CYAN}
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
