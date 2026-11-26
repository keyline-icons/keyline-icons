import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LockOff({ size = 24, ...props }: IconProps) {
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
      <path d="M7.5 10L7.5 7.5M8.1732 3.9301L8.8974 3.2405C9.7047 2.4719 10.7972 2 12 2C14.4853 2 16.5 4.0147 16.5 6.5L16.5 10M10 10L4 10L4 22L20 22L20 20M20 15.3431L20 14.3431L20 10L15.6569 10L14.6569 10M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
