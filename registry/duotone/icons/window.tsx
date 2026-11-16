import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Window({ size = 24, ...props }: IconProps) {
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
      <path d="M19 2C20.1046 2 21 2.895 21 4V20H22C22.5523 20 23 20.448 23 21C23 21.552 22.5523 22 22 22H2C1.4477 22 1 21.552 1 21C1 20.448 1.4477 20 2 20H3V4C3 2.895 3.8954 2 5 2H19Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M11 20H5V13H11V20ZM19 13V20H13V13H19ZM11 11H5V4H11V11Z" fill="currentColor"/>
      <path d="M19 11H13V4H19V11Z" fill="currentColor"/>
    </svg>
  )
}
