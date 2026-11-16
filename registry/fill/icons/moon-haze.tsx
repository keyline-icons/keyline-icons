import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MoonHaze({ size = 24, ...props }: IconProps) {
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
      <path d="M18.3264 13C18.7583 12.091 19 11.074 19 10C17.0185 11.585 14.1618 11.427 12.3673 9.633C10.5729 7.838 10.4147 4.982 12 3C8.134 3 5 6.134 5 10C5 11.074 5.2417 12.091 5.6736 13M4 17H20M5 21H10M14 21H19"/>
    </svg>
  )
}
