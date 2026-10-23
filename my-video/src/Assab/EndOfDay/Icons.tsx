import { BRAND_DARK } from "../theme";

// Line icons in the identity's icon language: 24 grid, one stroke weight,
// calm corners, minimal detail.
const Icon: React.FC<{
  readonly size: number;
  readonly children: React.ReactNode;
}> = ({ size, children }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={BRAND_DARK}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const InIcon: React.FC<{ readonly size: number }> = ({ size }) => (
  <Icon size={size}>
    <path d="M4 14v5h16v-5" />
    <path d="M12 3v11" />
    <path d="M8 10l4 4 4-4" />
  </Icon>
);

export const OutIcon: React.FC<{ readonly size: number }> = ({ size }) => (
  <Icon size={size}>
    <path d="M4 14v5h16v-5" />
    <path d="M12 14V3" />
    <path d="M8 7l4-4 4 4" />
  </Icon>
);

export const TransferIcon: React.FC<{ readonly size: number }> = ({ size }) => (
  <Icon size={size}>
    <path d="M9 4H5v16h4" />
    <path d="M10 12h10" />
    <path d="M16 8l4 4-4 4" />
  </Icon>
);

export const DocumentIcon: React.FC<{ readonly size: number }> = ({ size }) => (
  <Icon size={size}>
    <rect x={5} y={3} width={14} height={18} rx={2} />
    <path d="M9 8h6M9 12h6M9 16h4" />
  </Icon>
);

export const BoxIcon: React.FC<{ readonly size: number }> = ({ size }) => (
  <Icon size={size}>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
    <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
  </Icon>
);
