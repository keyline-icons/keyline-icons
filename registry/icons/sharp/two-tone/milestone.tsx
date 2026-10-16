import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Milestone({ size = 24, ...props }: IconProps) {
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
      <path d="M3 4L17 4C17.2164 4 17.4269 4.0702 17.6 4.2L21.6 7.2C21.8519 7.3889 22.0001 7.6852 22.0001 8C22.0001 8.3148 21.8519 8.6111 21.6 8.8L17.6 11.8C17.4269 11.9298 17.2164 12 17 12L3 12C2.4477 12 2 11.5523 2 11L2 5C2 4.4477 2.4477 4 3 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 5L17 5L21.0001 8L17 11L3 11L3 5ZM12 1L12 5M12 11L12 22M7 22L17 22"/>
    </svg>
  )
}
