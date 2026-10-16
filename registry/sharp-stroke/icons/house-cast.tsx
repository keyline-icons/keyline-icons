import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseCast({ size = 24, ...props }: IconProps) {
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
      <path d="M1 17L2 17C4.2091 17 6 18.7909 6 21L6 22M1 13L2 13C6.4183 13 10 16.5817 10 21L10 22M3.6709 9.4779L4.0568 9.1776L12 2.9963L22 10.7782L22.3859 11.0785M20 9.2218L20 21L14 21L13 21"/>
      <path d="M3 21C3 21.5523 2.5523 22 2 22C1.4477 22 1 21.5523 1 21C1 20.4477 1.4477 20 2 20C2.5523 20 3 20.4477 3 21Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
