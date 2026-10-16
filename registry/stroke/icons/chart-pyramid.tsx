import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartPyramid({ size = 24, ...props }: IconProps) {
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
      <path d="M10.2634 4.008L2.2659 18.008C1.5043 19.3413 2.467 21 4.0025 21L19.9975 21C21.533 21 22.4958 19.3413 21.7341 18.008L13.7366 4.008C12.9689 2.6641 11.0311 2.6641 10.2634 4.008ZM7.4117 9L16.5883 9M3.9842 15L20.0158 15" fill="none"/>
    </svg>
  )
}
