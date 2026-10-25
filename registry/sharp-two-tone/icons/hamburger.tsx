import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Hamburger({ size = 24, ...props }: IconProps) {
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
      <path d="M3 17L2 17C1.4477 17 1 16.5523 1 16L1 12C1 11.4477 1.4477 11 2 11L3 11C3 6.0294 7.0294 2 12 2C16.9706 2 21 6.0294 21 11L22 11C22.5523 11 23 11.4477 23 12L23 16C23 16.5523 22.5523 17 22 17L21 17L21 21C21 21.5523 20.5523 22 20 22L4 22C3.4477 22 3 21.5523 3 21L3 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 12L4 11C4 6.5817 7.5817 3 12 3C16.4183 3 20 6.5817 20 11L20 12M2 12L22 12L22 16L2 16ZM4 16L4 21L20 21L20 16" fill="none"/>
    </svg>
  )
}
