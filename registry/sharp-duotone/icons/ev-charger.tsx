import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EvCharger({ size = 24, ...props }: IconProps) {
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
      <path d="M14 23L2 23C1.4477 23 1 22.5523 1 22L1 2C1 1.4477 1.4477 1 2 1L14 1C14.5523 1 15 1.4477 15 2L15 21L23 21L23 23L14 23Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9.3 7.6L6 12L10 12L6.7 16.4M14 17L20 17L20 10M22 6L22 3M18 6L18 3" fill="none"/>
      <path d="M18 5L22 5C22.5523 5 23 5.4477 23 6L23 10C23 10.5523 22.5523 11 22 11L18 11C17.4477 11 17 10.5523 17 10L17 6C17 5.4477 17.4477 5 18 5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
