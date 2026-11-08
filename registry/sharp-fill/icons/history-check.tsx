import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HistoryCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M13 22H12C6.477 22 2 17.52 2 12C2 8.96 3.358 6.23 5.5 4.4C5.662 4.26 5.828 4.13 5.999 4M22 13V12C22 6.48 17.523 2 12 2C11.662 2 11.329 2.02 11 2.05L10.099 2.14M12 5V12H18M15.707 18.71L18 21L22.293 16.71"/>
      <path d="M2.32 2.79L6.543 4L5.339 8.22"/>
    </svg>
  )
}
