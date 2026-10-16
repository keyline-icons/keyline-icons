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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 2C3.7909 2 2 3.7909 2 6L2 8C2 8.5523 2.4477 9 3 9L21 9C21.5523 9 22 8.5523 22 8L22 6C22 3.7909 20.2091 2 18 2L6 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 8L3 6C3 4.3431 4.3431 3 6 3L18 3C19.6569 3 21 4.3431 21 6L21 8M3 12L21 12M3 16L3 18C3 19.6569 4.3431 21 6 21M10.5 21L13.5 21M18 21C19.6569 21 21 19.6569 21 18L21 16" fill="none"/>
    </svg>
  )
}
