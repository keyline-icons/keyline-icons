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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10 2L6 2C3.7909 2 2 3.7909 2 6L2 18C2 20.2091 3.7909 22 6 22L18 22C20.2091 22 22 20.2091 22 18L22 14C22 13.4477 21.5523 13 21 13L14 13C12.3431 13 11 11.6569 11 10L11 3C11 2.4477 10.5523 2 10 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 3C19.6568 3 21 4.3432 21 6C21 7.6569 19.6568 9 18 9C16.3432 9 15 7.6569 15 6C15 4.3432 16.3432 3 18 3Z"/>
    </svg>
  )
}
