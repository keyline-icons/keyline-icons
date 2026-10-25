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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3.0549 10C3.5524 5.5 7.3674 2 12 2C16.6326 2 20.4476 5.5 20.9451 10L3.0549 10ZM1 12L23 12L23 16L1 16L1 12ZM21 18L21 21C21 21.5523 20.5523 22 20 22L4 22C3.4477 22 3 21.5523 3 21L3 18L21 18Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
