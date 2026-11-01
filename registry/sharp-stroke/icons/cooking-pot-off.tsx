import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CookingPotOff({ size = 24, ...props }: IconProps) {
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
      <path d="M4 11L4 21L20 21L20 20M1 11L11 11M3 7L7 7M20 15.3431L20 11M15.6569 11L23 11M11.6569 7L21 7M7.6569 3L16 3L16 7M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
