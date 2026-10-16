import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GridSquaresPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M3 13L10 13C10.5523 13 11 13.4477 11 14L11 21C11 21.5523 10.5523 22 10 22L3 22C2.4477 22 2 21.5523 2 21L2 14C2 13.4477 2.4477 13 3 13ZM3 2L10 2C10.5523 2 11 2.4477 11 3L11 10C11 10.5523 10.5523 11 10 11L3 11C2.4477 11 2 10.5523 2 10L2 3C2 2.4477 2.4477 2 3 2ZM14 2L21 2C21.5523 2 22 2.4477 22 3L22 10C22 10.5523 21.5523 11 21 11L14 11C13.4477 11 13 10.5523 13 10L13 3C13 2.4477 13.4477 2 14 2Z" fill="currentColor" stroke="none"/>
      <path d="M18 14L18 22M14 18L22 18"/>
    </svg>
  )
}
