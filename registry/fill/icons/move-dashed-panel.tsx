import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MoveDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6C3 4.34315 4.34315 3 6 3M10 3H13M20 7V6C20 4.34315 18.6569 3 17 3M7 20H6C4.34315 20 3 18.6569 3 17M3 10V13M9 15H21M15 9V21M10.5 13.5L9 15L10.5 16.5M19.5 13.5L21 15L19.5 16.5M13.5 10.5L15 9L16.5 10.5M13.5 19.5L15 21L16.5 19.5"/>
    </svg>
  )
}
