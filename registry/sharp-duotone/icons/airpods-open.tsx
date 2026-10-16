import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AirpodsOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M1 21L1 9C1 8.4477 1.4477 8 2 8L2 3C2 2.4477 2.4477 2 3 2L21 2C21.5523 2 22 2.4477 22 3L22 8C22.5523 8 23 8.4477 23 9L23 21C23 21.5523 22.5523 22 22 22L2 22C1.4477 22 1 21.5523 1 21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 9L23 9M8 9L8 10L16 10L16 9"/>
      <path d="M13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
