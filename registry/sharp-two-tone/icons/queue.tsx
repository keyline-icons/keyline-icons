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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 3L22 3C22.5523 3 23 3.4477 23 4L23 12C23 12.5523 22.5523 13 22 13L2 13C1.4477 13 1 12.5523 1 12L1 4C1 3.4477 1.4477 3 2 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 4L22 4L22 12L2 12L2 4ZM1 16L23 16M1 20L18 20"/>
    </svg>
  )
}
