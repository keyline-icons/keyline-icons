import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquaresSubtract({ size = 24, ...props }: IconProps) {
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
      <path d="M9 2L15 2C15.5523 2 16 2.4477 16 3L16 9C16 9.5523 15.5523 10 15 10L10 10L10 15C10 15.5523 9.5523 16 9 16L3 16C2.4477 16 2 15.5523 2 15L2 3C2 2.4477 2.4477 2 3 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 3L15 3L15 9L9 9L9 15L3 15ZM18 9L21 9L21 13.5M21 16.5L21 21L16.5 21M13.5 21L9 21L9 18"/>
    </svg>
  )
}
