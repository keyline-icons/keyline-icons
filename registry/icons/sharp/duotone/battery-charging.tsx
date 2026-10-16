import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BatteryCharging({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6L2 6L2 18L6.5 18M13.5 6L18 6L18 18L13 18" fill="none" strokeOpacity="0.4"/>
      <path d="M22 8.5L22 15.5M11.3 7.6L8 12L12 12L8.7 16.4" fill="none"/>
    </svg>
  )
}
