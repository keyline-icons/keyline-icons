import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Camera({ size = 24, ...props }: IconProps) {
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
      <path d="M2 5L7 5L8.2001 3.4C8.389 3.1482 8.6854 3 9.0001 3L14.9999 3C15.3146 3 15.611 3.1482 15.7999 3.4L17 5L22 5C22.5523 5 23 5.4477 23 6L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 6C1 5.4477 1.4477 5 2 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 6L7.5 6L9.0001 4L14.9999 4L16.5 6L22 6L22 20L2 20L2 6ZM15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"/>
    </svg>
  )
}
