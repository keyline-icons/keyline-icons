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
      <path d="M3 3L3 19C3 20.1046 3.8954 21 5 21L21 21" strokeOpacity="0.4"/>
      <path d="M18 9L16 9C15.4477 9 15 9.4477 15 10L15 14C15 14.5523 15.4477 15 16 15L20 15C21.1046 15 22 14.1046 22 13L22 11C22 9.8954 21.1046 9 20 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 9L8 9C6.8954 9 6 9.8954 6 11L6 13C6 14.1046 6.8954 15 8 15L16 15C16.5523 15 17 14.5523 17 14L17 10C17 9.4477 16.5523 9 16 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M16 7V17"/>
    </svg>
  )
}
