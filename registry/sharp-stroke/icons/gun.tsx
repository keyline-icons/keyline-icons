import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Gun({ size = 24, ...props }: IconProps) {
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
      <path d="M19 5L19 3L19 2M16 10L14 14L9.5 14L9.2391 14M3.656 10C4.5 11 4.2373 12.6667 3.95 13.5L2.0004 21L6.9678 21L10.5161 10L18.5 10L19.5 9L22 9L22 5L19 5L3 5L2 9C2 9.5523 2.4477 10 3 10L3.656 10L10.5161 10" fill="none"/>
    </svg>
  )
}
