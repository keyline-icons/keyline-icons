import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IframeOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.707 21.707C21.526 21.888 21.276 22 21 22H3C2.448 22 2 21.552 2 21V3C2 2.724 2.112 2.474 2.293 2.293L3 3V9H9L21.707 21.707ZM5.743 2H12H21C21.552 2 22 2.448 22 3V18.257L5.743 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M21 21H3V3M3 9H9M17 17H7V13H13M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
