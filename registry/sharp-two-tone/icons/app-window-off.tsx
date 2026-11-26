import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AppWindowOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.707 21.7071C21.526 21.8881 21.276 22 21 22H3C2.448 22 2 21.5523 2 21V3C2 2.7239 2.112 2.4739 2.293 2.2929L21.707 21.7071ZM5.657 2H21C21.552 2 22 2.4477 22 3V18.3431L5.657 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M21 21H3V3M1.707 1.7071L22.293 22.293"/>
    </svg>
  )
}
