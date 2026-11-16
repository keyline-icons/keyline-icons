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
      <path d="M20 2C20.552 2 21 2.448 21 3V20H23V22H1V20H3V3C3 2.448 3.448 2 4 2H20Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M11 20H5V13H11V20ZM19 13V20H13V13H19ZM11 11H5V4H11V11Z" fill="currentColor"/>
      <path d="M19 11H13V4H19V11Z" fill="currentColor"/>
    </svg>
  )
}
