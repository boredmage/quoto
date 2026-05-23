import Svg, { Circle, Path } from "react-native-svg";

type IconProps = {
  size?: number;
  color?: string;
};

const STROKE = {
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ------------------------------- nav icons -------------------------------- */

export function HomeIcon({ size = 24, color = "#888888" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        stroke={color}
        {...STROKE}
      />
      <Path
        d="M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7"
        stroke={color}
        {...STROKE}
      />
    </Svg>
  );
}

export function DiscoverIcon({ size = 24, color = "#888888" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 6h11M4 12h7" stroke={color} {...STROKE} />
      <Circle cx={15} cy={16} r={4} stroke={color} {...STROKE} />
      <Path d="M21 22l-3-3" stroke={color} {...STROKE} />
    </Svg>
  );
}

export function BookmarkIcon({ size = 24, color = "#888888" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
        stroke={color}
        {...STROKE}
      />
    </Svg>
  );
}

export function UserIcon({ size = 24, color = "#888888" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
        stroke={color}
        {...STROKE}
      />
      <Circle cx={12} cy={7} r={4} stroke={color} {...STROKE} />
    </Svg>
  );
}

/* ----------------------------- content icons ------------------------------ */

export function DownloadIcon({ size = 24, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
        stroke={color}
        {...STROKE}
      />
    </Svg>
  );
}

export function HeartIcon({
  size = 24,
  color = "#ffffff",
  filled = false,
}: IconProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        stroke={color}
        fill={filled ? color : "none"}
        {...STROKE}
      />
    </Svg>
  );
}

export function FilePlusIcon({ size = 24, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke={color}
        {...STROKE}
      />
      <Path d="M14 2v6h6M12 12v6M9 15h6" stroke={color} {...STROKE} />
    </Svg>
  );
}

export function LayoutGridIcon({ size = 24, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 4h6v6H4zM14 4h6v6h-6zM14 14h6v6h-6zM4 14h6v6H4z"
        stroke={color}
        {...STROKE}
      />
    </Svg>
  );
}

export function PaletteIcon({ size = 24, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2a10 10 0 0 0 0 20 2.5 2.5 0 0 0 2.5-2.5c0-.7-.3-1.3-.7-1.8-.4-.5-.7-1.1-.7-1.7a2.5 2.5 0 0 1 2.5-2.5H18a4 4 0 0 0 4-4c0-4.97-4.48-9-10-9Z"
        stroke={color}
        {...STROKE}
      />
      <Circle cx={7.5} cy={10.5} r={1} fill={color} />
      <Circle cx={12} cy={7.5} r={1} fill={color} />
      <Circle cx={16.5} cy={10.5} r={1} fill={color} />
    </Svg>
  );
}

export function CopyIcon({ size = 20, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 9h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2z"
        stroke={color}
        {...STROKE}
      />
      <Path
        d="M5 15a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"
        stroke={color}
        {...STROKE}
      />
    </Svg>
  );
}

export function ShareIcon({ size = 20, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={18} cy={5} r={3} stroke={color} {...STROKE} />
      <Circle cx={6} cy={12} r={3} stroke={color} {...STROKE} />
      <Circle cx={18} cy={19} r={3} stroke={color} {...STROKE} />
      <Path
        d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
        stroke={color}
        {...STROKE}
      />
    </Svg>
  );
}

/** Outlined circle with a check — used for selected theme/colour swatches. */
export function CheckCircleIcon({ size = 20, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} {...STROKE} />
      <Path d="M8.5 12.5l2.5 2.5 4.5-5" stroke={color} {...STROKE} />
    </Svg>
  );
}

/* ---------------------------- functional icons ---------------------------- */

export function XIcon({ size = 24, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6 6 18M6 6l12 12" stroke={color} {...STROKE} />
    </Svg>
  );
}

export function ArrowLeftIcon({ size = 24, color = "#f6f6f6" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M12 19l-7-7 7-7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function EyeIcon({ size = 20, color = "#888888" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function EyeOffIcon({ size = 20, color = "#888888" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.88 4.24A10.94 10.94 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19M6.61 6.61A18.5 18.5 0 0 0 2 11s3.5 7 10 7a10.94 10.94 0 0 0 5.39-1.39M9.9 9.9a3 3 0 0 0 4.2 4.2M2 2l20 20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CheckIcon({ size = 14, color = "#000000" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6 9 17l-5-5"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/* ------------------------------ brand icons ------------------------------- */

export function GoogleIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <Path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z"
      />
      <Path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19Z"
      />
      <Path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </Svg>
  );
}

export function AppleIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#ffffff"
        d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98C13.876 1.74 15.214 1.04 16.32 1c.03.13.045.28.045.43ZM20.93 17.14c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8C4.05 18.38 3.013 15.57 3.013 12.92c0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.07-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45Z"
      />
    </Svg>
  );
}

export function TwitterIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#ffffff"
        d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723 9.9 9.9 0 0 1-3.127 1.184 4.92 4.92 0 0 0-8.384 4.482A13.97 13.97 0 0 1 1.64 3.162a4.92 4.92 0 0 0 1.523 6.57 4.9 4.9 0 0 1-2.228-.616v.06a4.92 4.92 0 0 0 3.946 4.827 4.99 4.99 0 0 1-2.212.085 4.94 4.94 0 0 0 4.604 3.417 9.87 9.87 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.94 13.94 0 0 0 7.557 2.209c9.053 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63A9.94 9.94 0 0 0 24 4.59l-.047-.02Z"
      />
    </Svg>
  );
}

export function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={12} fill="#1877F2" />
      <Path
        fill="#ffffff"
        d="M16.5 7.5h-2.1c-.62 0-1.4.83-1.4 1.94v1.56h3.5l-.55 3.5h-2.95V23h-3.5v-7.5H7v-3.5h2.5V9.06C9.5 6.7 11.16 5 13.6 5h2.9v2.5Z"
      />
    </Svg>
  );
}
