import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpRightDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5 21H13.5M3 13.5V10.5M7 3H6C4.34315 3 3 4.34315 3 6M3 18C3 19.6569 4.34315 21 6 21M21 17V18C21 19.6569 19.6569 21 18 21M11.5 3H20.4989C20.7751 3 21 3.22386 21 3.5V12.5M11.5 12.5L20.5 3.5"/>
    </svg>
  )
}
