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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 14L21 14C21.5523 14 22 14.4477 22 15L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 15C2 14.4477 2.4477 14 3 14Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 3L3 3L3 7M21 7L21 3L17 3M3 9L3 12M21 9L21 12M9.5 3L14.5 3"/>
      <path d="M8.7071 7.7071L12 11L15.2929 7.7071"/>
    </svg>
  )
}
