import { BRAND_DARK, BRAND_PURPLE } from "../theme";

// Flat editorial figures for the restaurant. Faces carry no features; skin
// keeps natural tones (the identity guide never tints skin purple).
export const SKIN = ["#C9926F", "#B47C5C", "#D8A684", "#A86F52"] as const;
const INK = "#1E1B2E";
const THOBE = "#FFFFFF";
const THOBE_SHADE = "#E4DEF3";
const CHAIR = BRAND_PURPLE;

type Seated = {
  readonly x: number;
  readonly y: number;
  readonly scale: number;
  readonly flip?: boolean;
  readonly skin?: number;
  readonly lift?: number;
};

const place = ({ x, y, scale, flip }: Seated) =>
  `translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`;

const Chair: React.FC = () => (
  <g>
    <rect x={-78} y={-215} width={18} height={215} rx={8} fill={CHAIR} />
    <rect x={-80} y={-14} width={120} height={18} rx={8} fill={CHAIR} />
    <rect x={-74} y={4} width={12} height={90} fill={BRAND_DARK} />
    <rect x={26} y={4} width={12} height={90} fill={BRAND_DARK} />
  </g>
);

// A man in a white thobe and ghutra with a black agal, facing right.
export const ThobeMan: React.FC<Seated> = (p) => {
  const skin = SKIN[p.skin ?? 0];
  const lift = p.lift ?? 0;
  return (
    <g transform={place(p)}>
      <Chair />
      <path
        d="M-58 -172 C-66 -120 -64 -40 -52 0 L46 0 C54 -50 46 -132 32 -172 Q-12 -192 -58 -172 Z"
        fill={THOBE}
      />
      <path
        d="M-58 -172 C-66 -120 -64 -40 -52 0 L-30 0 C-40 -60 -40 -130 -30 -176 Z"
        fill={THOBE_SHADE}
      />
      {/* Arm reaching to the table */}
      <path
        d={`M18 -150 Q60 -120 ${78} ${-96 - lift}`}
        stroke={THOBE}
        strokeWidth={30}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={84} cy={-92 - lift} r={15} fill={skin} />
      {/* Ghutra, face, agal */}
      <path
        d="M-48 -168 C-62 -230 -26 -266 2 -266 C32 -266 52 -236 40 -170 Q-4 -150 -48 -168 Z"
        fill={THOBE}
      />
      <path
        d="M-48 -168 C-62 -230 -40 -260 -14 -264 C-34 -230 -36 -196 -26 -164 Z"
        fill={THOBE_SHADE}
      />
      <ellipse cx={14} cy={-214} rx={22} ry={28} fill={skin} />
      <path
        d="M-10 -246 C6 -258 32 -252 40 -236 L36 -226 C24 -238 4 -242 -8 -234 Z"
        fill={THOBE}
      />
      <ellipse cx={0} cy={-250} rx={34} ry={8} fill={INK} />
      <ellipse cx={0} cy={-241} rx={35} ry={6} fill={INK} />
    </g>
  );
};

// A woman in a black abaya and hijab, facing right.
export const AbayaWoman: React.FC<Seated> = (p) => {
  const skin = SKIN[p.skin ?? 2];
  const lift = p.lift ?? 0;
  return (
    <g transform={place(p)}>
      <Chair />
      <path
        d="M-56 -168 C-64 -118 -62 -40 -50 0 L44 0 C52 -50 44 -128 30 -168 Q-12 -186 -56 -168 Z"
        fill={INK}
      />
      <path
        d={`M16 -146 Q56 -118 ${74} ${-94 - lift}`}
        stroke={INK}
        strokeWidth={28}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={80} cy={-90 - lift} r={14} fill={skin} />
      <path
        d="M-44 -164 C-56 -222 -24 -262 2 -262 C30 -262 50 -230 40 -166 Q-2 -150 -44 -164 Z"
        fill={INK}
      />
      <ellipse cx={16} cy={-212} rx={18} ry={24} fill={skin} />
      <path
        d="M-4 -236 C8 -246 28 -244 36 -230 L34 -220 C22 -232 8 -232 -2 -226 Z"
        fill={INK}
      />
    </g>
  );
};

// A waiter carrying a covered dish on a tray, standing, facing left.
export const Waiter: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly scale: number;
  readonly step: number;
}> = ({ x, y, scale, step }) => {
  const swing = Math.sin(step) * 10;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d={`M-22 -150 L${-30 + swing} 0`}
        stroke={INK}
        strokeWidth={26}
        strokeLinecap="round"
      />
      <path
        d={`M18 -150 L${26 - swing} 0`}
        stroke={INK}
        strokeWidth={26}
        strokeLinecap="round"
      />
      <path d="M-46 -330 Q-2 -350 44 -330 L36 -150 H-40 Z" fill={BRAND_DARK} />
      <path d="M-34 -250 H34 L30 -120 H-30 Z" fill="#F4F2FA" />
      <path
        d="M-40 -318 Q-90 -300 -110 -360"
        stroke={BRAND_DARK}
        strokeWidth={26}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={-112} cy={-366} r={14} fill={SKIN[1]} />
      <ellipse cx={-120} cy={-380} rx={80} ry={12} fill="#CFC6EE" />
      <path d="M-160 -384 Q-120 -446 -80 -384 Z" fill="#F4F2FA" />
      <circle cx={-120} cy={-430} r={6} fill={BRAND_DARK} />
      <ellipse cx={0} cy={-380} rx={28} ry={32} fill={SKIN[1]} />
      <path
        d="M-28 -392 C-26 -420 26 -420 28 -392 C14 -402 -14 -402 -28 -392 Z"
        fill={INK}
      />
    </g>
  );
};

// A table with a tablecloth top and food on it.
export const DiningTable: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly scale: number;
}> = ({ x, y, scale }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-12} y={10} width={24} height={150} fill={BRAND_DARK} />
    <ellipse cx={0} cy={160} rx={70} ry={12} fill={BRAND_DARK} />
    <ellipse cx={0} cy={6} rx={170} ry={40} fill="#D9CFF7" />
    <ellipse cx={0} cy={0} rx={170} ry={40} fill="#FFFFFF" />
    {/* Kabsa platter, salad, Saudi coffee cups */}
    <ellipse cx={-10} cy={-4} rx={70} ry={18} fill="#F4F2FA" />
    <path d="M-62 -6 Q-10 -46 42 -6 Z" fill="#FDDF35" />
    <path d="M-40 -10 Q-12 -34 18 -12 Z" fill="#F47B2B" />
    <ellipse cx={88} cy={0} rx={30} ry={9} fill="#F4F2FA" />
    <circle cx={82} cy={-4} r={7} fill="#7BC67E" />
    <circle cx={94} cy={-2} r={6} fill="#BA1878" />
    <path d="M-120 -10 h18 l-3 14 h-12 Z" fill="#F4F2FA" />
    <path d="M110 -18 h18 l-3 14 h-12 Z" fill="#F4F2FA" />
  </g>
);
