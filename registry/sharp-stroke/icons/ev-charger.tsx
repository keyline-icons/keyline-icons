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
      <path d="M2 2L14 2L14 22L2 22ZM14 22L23 22M14 17L20 17L20 10M18 6L22 6L22 10L18 10ZM22 6L22 3M18 6L18 3M9.3 7.6L6 12L10 12L6.7 16.4" fill="none"/>
    </svg>
  )
}
