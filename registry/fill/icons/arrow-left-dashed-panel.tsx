import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowLeftDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5 3H13.5M21 10.5V13.5M3 7V6C3 4.34315 4.34315 3 6 3M18 3C19.6569 3 21 4.34315 21 6M17 21H18C19.6569 21 21 19.6569 21 18M4 15.5H14M9 10L3.40208 15.1314C3.1859 15.3296 3.1859 15.6704 3.40208 15.8686L9 21"/>
    </svg>
  )
}
