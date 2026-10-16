import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Flip2Vertical({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2C2.4477 2 2 2.4477 2 3L2 9L22 9L22 3C22 2.4477 21.5523 2 21 2L3 2Z" fill="currentColor" stroke="none"/>
      <path d="M2 12L22 12M3 15L3 21L7 21M9.5 21L14.5 21M17 21L21 21L21 15" fill="none"/>
    </svg>
  )
}
