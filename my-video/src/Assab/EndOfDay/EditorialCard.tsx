import { BRAND_DARK, BRAND_PURPLE, TEXT } from "../theme";

// A white editorial card: icon tile on the right, label, optional status
// pill. Illustrative only — never a product screen and never any amounts.
export const EditorialCard: React.FC<{
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly status?: string;
  readonly width: number;
  readonly fontSize: number;
  readonly style?: React.CSSProperties;
}> = ({ icon, label, status, width, fontSize, style }) => (
  <div
    dir="rtl"
    lang="ar"
    style={{
      width,
      display: "flex",
      alignItems: "center",
      gap: 28,
      padding: "30px 34px",
      borderRadius: 34,
      backgroundColor: "#FFFFFF",
      boxShadow: "0 24px 60px rgba(58,45,125,0.16)",
      ...style,
    }}
  >
    <div
      style={{
        width: fontSize * 1.6,
        height: fontSize * 1.6,
        flexShrink: 0,
        borderRadius: 22,
        backgroundColor: "#EEE9FB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontFamily: TEXT,
          fontWeight: 700,
          fontSize,
          lineHeight: 1.3,
          color: BRAND_DARK,
        }}
      >
        {label}
      </div>
      {status ? (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
            padding: "4px 16px",
            borderRadius: 999,
            backgroundColor: BRAND_PURPLE,
            color: "#FFFFFF",
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: fontSize * 0.5,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
            }}
          />
          {status}
        </div>
      ) : null}
    </div>
  </div>
);
