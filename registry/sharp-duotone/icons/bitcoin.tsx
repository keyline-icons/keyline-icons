import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bitcoin({ size = 24, ...props }: IconProps) {
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
      <path d="M5 20L5 19L5 5L15.5 5C17.433 5 19 6.567 19 8.5C19 10.433 17.433 12 15.5 12L5 12L4 12M4 12L5 12L15.5 12C17.433 12 19 13.567 19 15.5C19 17.433 17.433 19 15.5 19L5 19L4 19M10 1L10 2L10 5L10 6M15.5 1L15.5 2L15.5 5L15.5 6M10 18L10 19L10 22L10 23M15.5 18L15.5 19L15.5 22L15.5 23" fill="none"/>
    </svg>
  )
}
