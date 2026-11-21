import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FilmScan({ size = 24, ...props }: IconProps) {
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
      <path d="M13 3H6C4.3431 3 3 4.3431 3 6V18C3 19.6569 4.3431 21 6 21H13M8 3V21M3 12H13M3 7.5H8M3 16.5H8M13 2V22M17 3V10M17 21V14M21 20V18M21 14V10M21 6V4"/>
    </svg>
  )
}
