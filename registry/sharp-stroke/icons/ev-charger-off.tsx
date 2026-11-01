import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EvChargerOff({ size = 24, ...props }: IconProps) {
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
      <path d="M14 14L14 22L2 22L2 2M14 22L22 22M14 17L17 17M8.5714 8.5714L6 12L10 12L6.7 16.4M6.6569 2L14 2L14 9.3431M20 15.3431L20 10M18 6L22 6L22 10L18 10L18 6ZM22 6L22 3M18 6L18 3M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
