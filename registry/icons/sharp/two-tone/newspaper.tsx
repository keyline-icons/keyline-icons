import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Newspaper({ size = 24, ...props }: IconProps) {
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
      <path d="M8 2L21 2C21.5523 2 22 2.4477 22 3L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 9C2 8.4477 2.4477 8 3 8L7 8L7 3C7 2.4477 7.4477 2 8 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 3L21 3L21 21L3 21L3 9L8 9L8 3ZM8 9L8 21M11 8L18 8M11 12L18 12M11 16L16 16" fill="none"/>
    </svg>
  )
}
