import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Connection({ size = 24, ...props }: IconProps) {
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
      <path d="M11 17.5C11 19.9853 8.9853 22 6.5 22C4.0147 22 2 19.9853 2 17.5C2 15.0147 4.0147 13 6.5 13C8.9853 13 11 15.0147 11 17.5ZM22 6.5C22 8.9853 19.9853 11 17.5 11C15.0147 11 13 8.9853 13 6.5C13 4.0147 15.0147 2 17.5 2C19.9853 2 22 4.0147 22 6.5Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10 17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14C8.433 14 10 15.567 10 17.5ZM21 6.5C21 8.433 19.433 10 17.5 10C15.567 10 14 8.433 14 6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5ZM8.9749 15.0251L15.0251 8.9749" fill="none"/>
    </svg>
  )
}
