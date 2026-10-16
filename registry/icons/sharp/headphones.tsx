import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Headphones({ size = 24, ...props }: IconProps) {
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
      <path d="M3 12C3 10.8954 3.8954 10 5 10L7 10L7 21L5 21C3.8954 21 3 20.1046 3 19L3 12ZM21 12C21 10.8954 20.1046 10 19 10L17 10L17 21L19 21C20.1046 21 21 20.1046 21 19L21 12ZM3 12C3 7.0294 7.0294 3 12 3C16.9706 3 21 7.0294 21 12"/>
    </svg>
  )
}
