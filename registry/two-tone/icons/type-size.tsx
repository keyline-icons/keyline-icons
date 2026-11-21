import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TypeSize({ size = 24, ...props }: IconProps) {
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
      <path d="M13 13V12C13 11.4477 13.4477 11 14 11H21C21.5523 11 22 11.4477 22 12V13M17.5 11V20M16 20H19" strokeOpacity="0.4"/>
      <path d="M2 7V6C2 4.8954 2.8954 4 4 4H14C15.1046 4 16 4.8954 16 6V7M9 4V20M6 20H12"/>
    </svg>
  )
}
