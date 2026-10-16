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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 8L2 3C2 2.4477 2.4477 2 3 2L21 2C21.5523 2 22 2.4477 22 3L22 8L2 8ZM23 10L23 21C23 21.5523 22.5523 22 22 22L2 22C1.4477 22 1 21.5523 1 21L1 10L23 10ZM7 10C7 10.5523 7.4477 11 8 11L16 11C16.5523 11 17 10.5523 17 10L7 10ZM13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14Z" fill="currentColor"/>
    </svg>
  )
}
