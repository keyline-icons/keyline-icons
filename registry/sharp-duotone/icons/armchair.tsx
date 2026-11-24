import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Armchair({ size = 24, ...props }: IconProps) {
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
      <path d="M3 10.1707L3 2C3 1.4477 3.4477 1 4 1L12 1L20 1C20.5523 1 21 1.4477 21 2L21 10.1707C20.6872 10.0601 20.3506 10 20 10C18.3431 10 17 11.3431 17 13L7 13C7 11.3431 5.6569 10 4 10C3.6494 10 3.3128 10.0601 3 10.1707Z" fill="currentColor" stroke="none"/>
      <path d="M12 21L19 21L22 21C22.5523 21 23 20.5523 23 20L23 13C23 11.3431 21.6569 10 20 10C18.3431 10 17 11.3431 17 13L7 13C7 11.3431 5.6569 10 4 10C2.3431 10 1 11.3431 1 13L1 20C1 20.5523 1.4477 21 2 21L5 21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 20L19 22L19 23M5 20L5 22L5 23"/>
    </svg>
  )
}
