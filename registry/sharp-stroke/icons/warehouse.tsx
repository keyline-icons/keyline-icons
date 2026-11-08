import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Warehouse({ size = 24, ...props }: IconProps) {
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
      <path d="M18 22H22V9C22 8.39 21.636 7.85 21.077 7.62L12.769 2.15C12.526 2.05 12.264 2 12 2C11.736 2 11.474 2.05 11.231 2.15L2.923 7.62C2.364 7.85 2 8.39 2 9V22H6M18 22H6M18 22V18M6 22V18M18 18H6M18 18V14M6 18V14M18 14V10H6V14M18 14H6"/>
    </svg>
  )
}
