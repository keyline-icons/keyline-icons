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
      <path d="M3 2L3 21L22 21" strokeOpacity="0.4"/>
      <path d="M18.5 9L16 9C15.4477 9 15 9.4477 15 10L15 14C15 14.5523 15.4477 15 16 15L21 15C21.5523 15 22 14.5523 22 14L22 10C22 9.4477 21.5523 9 21 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11.5 9L7 9C6.4477 9 6 9.4477 6 10L6 14C6 14.5523 6.4477 15 7 15L16 15C16.5523 15 17 14.5523 17 14L17 10C17 9.4477 16.5523 9 16 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M16 6L16 18"/>
    </svg>
  )
}
