import { BRAND_CYAN, BRAND_DARK, BRAND_PURPLE } from "./theme";

// Line icons on a 64 grid, in the identity's icon style: one stroke weight,
// calm corners, dark purple lines with purple and cyan accents.
const stroke = {
  fill: "none",
  stroke: BRAND_DARK,
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Riyadh: Kingdom Centre, with the sky showing through its arch.
export const KingdomCentreIcon: React.FC<{ readonly size: number }> = ({
  size,
}) => (
  <svg viewBox="0 0 64 64" width={size} height={size}>
    <path d="M27 9 Q32 33 37 9 Z" fill={BRAND_CYAN} />
    <path
      d="M22 57 C24 40 25.5 24 27 9 Q32 33 37 9 C38.5 24 40 40 42 57"
      {...stroke}
    />
    <path
      d="M28.7 19.5 H35.3"
      {...stroke}
      stroke={BRAND_PURPLE}
      strokeWidth={4}
    />
    <path d="M14 57 H50" {...stroke} />
  </svg>
);

// Western region: King Fahd's Fountain over the Red Sea at Jeddah.
export const FountainIcon: React.FC<{ readonly size: number }> = ({ size }) => (
  <svg viewBox="0 0 64 64" width={size} height={size}>
    <path d="M32 50 V10" {...stroke} stroke={BRAND_PURPLE} strokeWidth={4} />
    <path d="M32 11 Q22 12 17 32" {...stroke} />
    <path d="M32 11 Q42 12 47 32" {...stroke} />
    <circle cx={15.5} cy={37} r={1.8} fill={BRAND_CYAN} />
    <circle cx={48.5} cy={37} r={1.8} fill={BRAND_CYAN} />
    <path
      d="M8 54 q6 -4 12 0 t12 0 t12 0 t12 0"
      {...stroke}
      stroke={BRAND_CYAN}
    />
  </svg>
);

// Eastern region: the Khobar Water Tower on the Gulf coast.
export const WaterTowerIcon: React.FC<{ readonly size: number }> = ({
  size,
}) => (
  <svg viewBox="0 0 64 64" width={size} height={size}>
    <path d="M32 6 V15" {...stroke} />
    <ellipse cx={32} cy={24} rx={12} ry={9} fill={BRAND_PURPLE} />
    <path d="M20.5 24 H43.5" {...stroke} stroke={BRAND_CYAN} />
    <path d="M29 33 L27.5 57 M35 33 L36.5 57" {...stroke} />
    <path d="M14 57 H50" {...stroke} />
  </svg>
);
