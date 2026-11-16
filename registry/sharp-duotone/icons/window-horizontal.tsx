import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WindowHorizontal({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21 4C21.552 4 22 4.448 22 5V18H23V20H1V18H2V5C2 4.448 2.448 4 3 4H21Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M11 18H4V13H11V18ZM20 13V18H13V13H20ZM11 11H4V6H11V11Z" fill="currentColor"/>
      <path d="M20 11H13V6H20V11Z" fill="currentColor"/>
    </svg>
  )
}
