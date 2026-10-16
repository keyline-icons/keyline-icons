import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Queue({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L20 3C21.65685 3 23 4.34315 23 6L23 10C23 11.65685 21.65685 13 20 13L4 13C2.34315 13 1 11.65685 1 10L1 6C1 4.34315 2.34315 3 4 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 4L20 4C21.10457 4 22 4.89543 22 6L22 10C22 11.10457 21.10457 12 20 12L4 12C2.89543 12 2 11.10457 2 10L2 6C2 4.89543 2.89543 4 4 4ZM2 16H22M2 20H17"/>
    </svg>
  )
}
