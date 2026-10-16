import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanQrCode({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 9L3 3L9 3M15 3L21 3L21 9M21 15L21 21L15 21M9 21L3 21L3 15" strokeOpacity="0.4"/>
      <path d="M12 6L12 12L18 12M12 22L12 16L6 16M9 12L2 12M7.5 6L7.5 9M16.5 15L16.5 18"/>
      <path d="M11 2L13 2L13 4L11 4L11 2ZM20 11L22 11L22 13L20 13L20 11ZM15.5 6.5L17.5 6.5L17.5 8.5L15.5 8.5L15.5 6.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
