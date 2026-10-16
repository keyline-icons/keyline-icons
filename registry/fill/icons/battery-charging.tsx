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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 6L5 6C3.3431 6 2 7.3431 2 9L2 15C2 16.6569 3.3431 18 5 18L5.5 18M14.5 6L15 6C16.6569 6 18 7.3431 18 9L18 15C18 16.6569 16.6569 18 15 18L14 18M22 9.5L22 14.5M11 8L8 12L12 12L9 16" fill="none"/>
    </svg>
  )
}
