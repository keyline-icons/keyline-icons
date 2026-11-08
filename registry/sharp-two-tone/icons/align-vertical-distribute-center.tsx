import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeCenter({ size = 24, ...props }: IconProps) {
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
      <path d="M17 13C17.552 13 18 13.448 18 14V16H23V18H18V20C18 20.552 17.552 21 17 21H7C6.448 21 6 20.552 6 20V18H1V16H6V14C6 13.448 6.448 13 7 13H17ZM19 3C19.552 3 20 3.448 20 4V6H23V8H20V10C20 10.552 19.552 11 19 11H5C4.448 11 4 10.552 4 10V8H1V6H4V4C4 3.448 4.448 3 5 3H19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 17V14H17V17M7 17V20H17V17M7 17H1M17 17H23M19 7V10H5V7M19 7V4H5V7M19 7H23M5 7H1"/>
    </svg>
  )
}
