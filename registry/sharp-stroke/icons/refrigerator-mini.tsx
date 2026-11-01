import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RefrigeratorMini({ size = 24, ...props }: IconProps) {
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
      <path d="M2 20L2 2L22 2L22 20L2 20ZM2 10L22 10M5 20L5 23M19 20L19 23M6 20L6 16L8 16M10 20L10 16L8 16M8 16L8 13M14 20L14 16L16 16M18 20L18 16L16 16M16 16L16 13" fill="none"/>
      <path d="M7 6C7 6.5523 6.5523 7 6 7C5.4477 7 5 6.5523 5 6C5 5.4477 5.4477 5 6 5C6.5523 5 7 5.4477 7 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
