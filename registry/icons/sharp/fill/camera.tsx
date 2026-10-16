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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 5L7 5L8.2001 3.4C8.389 3.1482 8.6854 3 9.0001 3L14.9999 3C15.3146 3 15.611 3.1482 15.7999 3.4L17 5L22 5C22.5523 5 23 5.4477 23 6L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 6C1 5.4477 1.4477 5 2 5ZM16 13C16 15.0711 14.0711 17 12 17C9.9289 17 8 15.0711 8 13C8 10.9289 9.9289 9 12 9C14.0711 9 16 10.9289 16 13ZM14 13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13C10 11.8954 10.8954 11 12 11C13.1046 11 14 11.8954 14 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
