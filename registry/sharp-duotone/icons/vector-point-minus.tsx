import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorPointMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M2 20V19C2 15 5 11 9 11M13 11C17 11 22 9 22 5V4" strokeOpacity="0.4"/>
      <path d="M11 8H13C13.552 8 14 8.448 14 9V13C14 13.552 13.552 14 13 14H9C8.448 14 8 13.552 8 13V9C8 8.448 8.448 8 9 8H11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15 19H23"/>
    </svg>
  )
}
