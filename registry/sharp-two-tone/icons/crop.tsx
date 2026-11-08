import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Crop({ size = 24, ...props }: IconProps) {
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
      <path d="M7 5H18C18.552 5 19 5.45 19 6V17H23V19H19V23H17V19H6C5.448 19 5 18.55 5 18V7H1V5H5V1H7V5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 1V18H23M18 23V6H1"/>
    </svg>
  )
}
