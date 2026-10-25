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
      <path d="M3.0549 12C3.0183 11.6679 2.9999 11.3341 3 11C3 6.0294 7.0294 2 12 2C16.9706 2 21 6.0294 21 11C21.0001 11.3341 20.9817 11.6679 20.9451 12L3.0549 12ZM3 16C3 15.4477 3.4477 15 4 15L20 15C20.5523 15 21 15.4477 21 16L21 18C21 20.2092 19.2092 22 17 22L7 22C4.7908 22 3 20.2092 3 18L3 16Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M4 11L20 11C21.6569 11 23 12.3431 23 14C23 15.6569 21.6569 17 20 17L4 17C2.3431 17 1 15.6569 1 14C1 12.3431 2.3431 11 4 11Z" fill="currentColor"/>
    </svg>
  )
}
