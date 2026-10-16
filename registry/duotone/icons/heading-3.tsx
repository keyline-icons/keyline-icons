import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Heading3({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4V20M11 4V20M2 12H11" strokeOpacity="0.4"/>
      <path d="M17 13H21L18.8564 16C20.0403 16 21 16.8954 21 18C21 19.1046 20.0403 20 18.8564 20C18.0906 20 17.3829 19.6188 17 19"/>
    </svg>
  )
}
