import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartBullet({ size = 24, ...props }: IconProps) {
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
      <path d="M14 9L21 9C21.5523 9 22 9.4477 22 10L22 14C22 14.5523 21.5523 15 21 15L7 15C6.4477 15 6 14.5523 6 14L6 10C6 9.4477 6.4477 9 7 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 2L3 21L22 21" strokeOpacity="0.4"/>
      <path d="M7 10L21 10L21 14L7 14ZM16 6L16 18"/>
    </svg>
  )
}
