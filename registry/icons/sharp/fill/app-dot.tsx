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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10 2L3 2C2.4477 2 2 2.4477 2 3L2 21C2 21.5523 2.4477 22 3 22L21 22C21.5523 22 22 21.5523 22 21L22 14C22 13.4477 21.5523 13 21 13L11 13L11 3C11 2.4477 10.5523 2 10 2ZM22 6C22 8.2091 20.2091 10 18 10C15.7909 10 14 8.2091 14 6C14 3.7909 15.7909 2 18 2C20.2091 2 22 3.7909 22 6ZM18 4C16.8954 4 16 4.8954 16 6C16 7.1046 16.8954 8 18 8C19.1046 8 20 7.1046 20 6C20 4.8954 19.1046 4 18 4Z" fill="currentColor"/>
    </svg>
  )
}
