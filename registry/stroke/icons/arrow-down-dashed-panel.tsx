import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowDownDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6C3 4.34315 4.34315 3 6 3M10.5 3H13.5M21 7V6.00026C21 4.34341 19.6569 3 18 3M7 21H6C4.34315 21 3 19.6569 3 18M3 10.5V13.5M15.5 20V10M10 15L15.1314 20.5979C15.3296 20.8141 15.6704 20.8141 15.8686 20.5979L21 15"/>
    </svg>
  )
}
