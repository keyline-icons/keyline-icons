import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Users({ size = 24, ...props }: IconProps) {
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
      <path d="M15 3L16 3C17.6569 3 19 4.3431 19 6C19 7.6569 17.6569 9 16 9L15 9M17.4121 13.0823L18.3333 13.4713C20.554 14.409 22 16.589 22 19V20C22 20.5523 21.5523 21 21 21L20 21"/>
      <path d="M9 2C11.0711 2 13 3.9289 13 6C13 8.0711 11.0711 10 9 10C6.9289 10 5 8.0711 5 6C5 3.9289 6.9289 2 9 2ZM8 12L10 12C13.7279 12 17 15.2721 17 19L17 21C17 21.5523 16.5523 22 16 22L2 22C1.4477 22 1 21.5523 1 21L1 19C1 15.2721 4.2721 12 8 12Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
