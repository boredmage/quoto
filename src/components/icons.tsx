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
        d="M16.0002 14.9998C13.7902 16.3328 10.2082 16.3328 8.00024 14.9998M19.0003 8.70977L13.6673 4.56177C13.1993 4.19768 12.6232 4 12.0303 4C11.4373 4 10.8613 4.19768 10.3933 4.56177L5.05927 8.70977C4.73872 8.95905 4.47937 9.2783 4.30103 9.64312C4.12269 10.0079 4.03008 10.4087 4.03027 10.8148V18.0148C4.03027 18.5452 4.24099 19.0539 4.61606 19.429C4.99113 19.8041 5.49984 20.0148 6.03027 20.0148H18.0303C18.5607 20.0148 19.0694 19.8041 19.4445 19.429C19.8196 19.0539 20.0303 18.5452 20.0303 18.0148V10.8148C20.0303 9.99177 19.6503 9.21477 19.0003 8.70977Z"
        stroke={color}
        {...STROKE}
      />
    </Svg>
  );
}

export function DiscoverIcon({ size = 24, color = "#888888" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.5 18.5L21 21M4 6H20M4 12H8M4 18H8M11 15C11 16.0609 11.4214 17.0783 12.1716 17.8284C12.9217 18.5786 13.9391 19 15 19C16.0609 19 17.0783 18.5786 17.8284 17.8284C18.5786 17.0783 19 16.0609 19 15C19 13.9391 18.5786 12.9217 17.8284 12.1716C17.0783 11.4214 16.0609 11 15 11C13.9391 11 12.9217 11.4214 12.1716 12.1716C11.4214 12.9217 11 13.9391 11 15Z"
        stroke={color}
        {...STROKE}
      />
    </Svg>
  );
}

export function BookmarkIcon({ size = 24, color = "#888888" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 4H15C15.5304 4 16.0391 4.21071 16.4142 4.58579C16.7893 4.96086 17 5.46957 17 6V20L12 17L7 20V6C7 5.46957 7.21071 4.96086 7.58579 4.58579C7.96086 4.21071 8.46957 4 9 4Z"
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
        d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z"
        stroke={color}
        {...STROKE}
      />
    </Svg>
  );
}

/* ----------------------------- content icons ------------------------------ */

export function DownloadIcon({ size = 24, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 17V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17M17 11L12 16L7 11M12 16V4"
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
        d="M19.4998 12.5719L11.9998 19.9999L4.49981 12.5719C4.00512 12.0905 3.61546 11.5119 3.35536 10.8726C3.09527 10.2332 2.97037 9.54688 2.98855 8.85687C3.00673 8.16685 3.16758 7.48807 3.46097 6.86327C3.75436 6.23847 4.17395 5.68119 4.6933 5.22651C5.21265 4.77184 5.82052 4.42962 6.47862 4.22141C7.13673 4.01321 7.83082 3.94352 8.51718 4.01673C9.20354 4.08995 9.86731 4.30449 10.4667 4.64684C11.0661 4.98919 11.5881 5.45193 11.9998 6.00593C12.4133 5.45595 12.9359 4.99725 13.5349 4.65854C14.1339 4.31982 14.7963 4.10838 15.4807 4.03745C16.1652 3.96652 16.8569 4.03763 17.5126 4.24632C18.1683 4.45502 18.7738 4.79681 19.2914 5.2503C19.8089 5.70379 20.2272 6.25922 20.5202 6.88182C20.8132 7.50443 20.9746 8.18082 20.9941 8.86864C21.0137 9.55647 20.8911 10.2409 20.6339 10.8792C20.3768 11.5174 19.9907 12.0958 19.4998 12.5779"
        stroke={color}
        fill={filled ? color : "none"}
        {...STROKE}
      />
    </Svg>
  );
}

export function FilePlusIcon({ size = 24, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 20" fill="none">
      <Path
        d="M10 1V5C10 5.26522 10.1054 5.51957 10.2929 5.70711C10.4804 5.89464 10.7348 6 11 6H15M15 6L10 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17V6ZM8 9V15M5 12H11"
        stroke={color}
        {...STROKE}
      />
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
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M1 11C1 16.5228 5.47715 21 11 21C12.6569 21 14 19.6569 14 18V17.5C14 17.0356 14 16.8034 14.0257 16.6084C14.2029 15.2622 15.2622 14.2029 16.6084 14.0257C16.8034 14 17.0356 14 17.5 14H18C19.6569 14 21 12.6569 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11Z"
        stroke={color}
        {...STROKE}
      />
      <Path
        d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z"
        stroke={color}
        {...STROKE}
      />
      <Path
        d="M15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6C14.4477 6 14 6.44772 14 7C14 7.55228 14.4477 8 15 8Z"
        stroke={color}
        {...STROKE}
      />
      <Path
        d="M9 7C9.55228 7 10 6.55228 10 6C10 5.44772 9.55228 5 9 5C8.44772 5 8 5.44772 8 6C8 6.55228 8.44772 7 9 7Z"
        stroke={color}
        {...STROKE}
      />
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

export function ChevronLeftIcon({ size = 24, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
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
