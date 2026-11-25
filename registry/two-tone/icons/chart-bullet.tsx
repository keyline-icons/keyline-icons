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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14 9L20 9C21.1046 9 22 9.8954 22 11L22 13C22 14.1046 21.1046 15 20 15L8 15C6.8954 15 6 14.1046 6 13L6 11C6 9.8954 6.8954 9 8 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 3L3 19C3 20.1046 3.8954 21 5 21L21 21" strokeOpacity="0.4"/>
      <path d="M8 10L20 10C20.5523 10 21 10.4477 21 11L21 13C21 13.5523 20.5523 14 20 14L8 14C7.4477 14 7 13.5523 7 13L7 11C7 10.4477 7.4477 10 8 10ZM16 7V17"/>
    </svg>
  )
}
