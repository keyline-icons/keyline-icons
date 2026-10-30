import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CookingPot({ size = 24, ...props }: IconProps) {
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
      <path d="M3.988 10.0001C3.992 10 3.996 10 4 10L20 10C20.004 10 20.008 10 20.012 10.0001L23 10.0001L23 12.0001L21 12.0001L21 21C21 21.5523 20.5523 22 20 22L4 22C3.4477 22 3 21.5523 3 21L3 12.0001L1 12.0001L1 10.0001L3.988 10.0001Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7 6.0001L7 3C7 2.4477 7.4477 2 8 2L16 2C16.5523 2 17 2.4477 17 3L17 6.0001L21 6.0001L21 8.0001L3 8.0001L3 6.0001L7 6.0001Z" fill="currentColor"/>
    </svg>
  )
}
