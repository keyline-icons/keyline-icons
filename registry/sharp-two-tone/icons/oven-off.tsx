import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function OvenOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21 21V22C21 22.552 20.552 23 20 23H4C3.448 23 3 22.552 3 22V3L21 21ZM4.743 1H20C20.552 1 21 1.448 21 2V17.257L4.743 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 20V22H4V4M4 10H10M8 14H14M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
