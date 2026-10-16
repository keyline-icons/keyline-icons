import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelBottomCloseDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M3 14L21 14C21.5523 14 22 14.4477 22 15L22 18C22 20.2091 20.2091 22 18 22L6 22C3.7909 22 2 20.2091 2 18L2 15C2 14.4477 2.4477 14 3 14Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 3C4.34315 3 3 4.34315 3 6M21 6C21 4.34315 19.6569 3 18 3M3 10V11M21 10V11M10.5 3H13.5"/>
      <path d="M9 8L12 11L15 8"/>
    </svg>
  )
}
