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
      <path d="M3 8L3 6C3 4.3431 4.3431 3 6 3L18 3C19.6569 3 21 4.3431 21 6L21 8M3 12L21 12M3 16L3 18C3 19.6569 4.3431 21 6 21M10.5 21L13.5 21M18 21C19.6569 21 21 19.6569 21 18L21 16" fill="none"/>
    </svg>
  )
}
