import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AppDot({ size = 24, ...props }: IconProps) {
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
      <path d="M10 2L3 2C2.4477 2 2 2.4477 2 3L2 21C2 21.5523 2.4477 22 3 22L21 22C21.5523 22 22 21.5523 22 21L22 14C22 13.4477 21.5523 13 21 13L11 13L11 3C11 2.4477 10.5523 2 10 2ZM22 6C22 8.2091 20.2091 10 18 10C15.7909 10 14 8.2091 14 6C14 3.7909 15.7909 2 18 2C20.2091 2 22 3.7909 22 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 3L3 3L3 21L21 21L21 13M18 3C19.6568 3 21 4.3432 21 6C21 7.6569 19.6568 9 18 9C16.3432 9 15 7.6569 15 6C15 4.3432 16.3432 3 18 3Z"/>
    </svg>
  )
}
