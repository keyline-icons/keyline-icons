import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowSwap({ size = 24, ...props }: IconProps) {
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
      <path d="M18 21V10C18 8.3431 16.657 7 15 7C13.343 7 12 8.3431 12 10V14C12 15.6569 10.657 17 9 17C7.343 17 6 15.6569 6 14V3M21 18L18 21L15 18M9 6L6 3L3 6"/>
    </svg>
  )
}
