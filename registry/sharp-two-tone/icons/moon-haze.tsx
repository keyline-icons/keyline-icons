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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 17H21M4 21H11M13 21H20" strokeOpacity="0.4"/>
      <path d="M18.055 13.571L18.326 13C18.758 12.091 19 11.074 19 10C17.018 11.585 14.162 11.427 12.367 9.633C10.573 7.838 10.415 4.982 12 3C8.134 3 5 6.134 5 10C5 11.074 5.242 12.091 5.674 13L5.945 13.571"/>
    </svg>
  )
}
