import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowInRightDashedPanel({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10.5 3L13.5 3M21 10.5L21 13.5M3 7L3 6C3 4.3431 4.3431 3 6 3M18 3C19.6569 3 21 4.3431 21 6M17 21L18 21C19.6569 21 21 19.6569 21 18" strokeOpacity="0.4"/>
      <path d="M3 15.5L13 15.5M8 10L13.5979 15.1314C13.8141 15.3296 13.8141 15.6704 13.5979 15.8686L8 21"/>
    </svg>
  )
}
