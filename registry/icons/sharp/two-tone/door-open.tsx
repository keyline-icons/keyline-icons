import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DoorOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M5.7575 3.0299L13.7575 1.0299C13.8368 1.01 13.9182 1 14 1C14.5523 1 15 1.4477 15 2L15 22C15 22.5523 14.5523 23 14 23C13.9058 23 13.812 22.9867 13.7215 22.9604L5.7215 20.6404C5.2941 20.5165 5 20.125 5 19.68L5 4C5 3.5411 5.3123 3.1411 5.7575 3.0299Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 4L14 2L14 22L6 19.68L6 4ZM18 21L18 3L14 3M1 21L10.5517 21M14 21L23 21M11 10L11 14" fill="none"/>
    </svg>
  )
}
