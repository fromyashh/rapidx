interface RapidXLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
}

export function RapidXMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="RapidX logo mark"
    >
      {/* Outer angular frame — forward-leaning parallelogram */}
      <path
        d="M6 2H28L34 38H12L6 2Z"
        fill="hsl(var(--primary))"
      />
      {/* Left diagonal slash — the R leg crossing to X */}
      <path
        d="M13 10H24L22 20H11L13 10Z"
        fill="hsl(var(--background))"
        opacity="0.9"
      />
      {/* Bottom X slash */}
      <path
        d="M11 23L16 38H25L20 23H11Z"
        fill="hsl(var(--background))"
        opacity="0.7"
      />
      {/* Speed bar — right edge accent */}
      <rect x="30" y="2" width="4" height="36" rx="2" fill="hsl(var(--primary))" opacity="0.4" />
    </svg>
  );
}

export default function RapidXLogo({ showWordmark = true, size = 36, className = "" }: RapidXLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`} aria-label="RapidX">
      <RapidXMark size={size} />
      {showWordmark && (
        <span
          className="font-display font-black uppercase tracking-tight select-none"
          style={{ fontSize: size * 0.56, letterSpacing: "-0.03em", lineHeight: 1 }}
        >
          Rapid<span style={{ color: "hsl(var(--primary))" }}>X</span>
        </span>
      )}
    </div>
  );
}
