import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignCenterHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M20 3C20.552 3 21 3.4477 21 4V11H23V13H21V20C21 20.5523 20.552 21 20 21H14C13.448 21 13 20.5523 13 20V13H11V16C11 16.5523 10.552 17 10 17H4C3.448 17 3 16.5523 3 16V13H1V11H3V8C3 7.4477 3.448 7 4 7H10C10.552 7 11 7.4477 11 8V11H13V4C13 3.4477 13.448 3 14 3H20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 12H4M10 12H14M20 12H23M4 8H10V16H4V8ZM14 4H20V20H14V4Z"/>
    </svg>
  )
}
