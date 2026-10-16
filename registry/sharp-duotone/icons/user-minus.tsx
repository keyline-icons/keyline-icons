import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M8 13L10 13C13.7279 13 17 16.2721 17 20L17 21C17 21.5523 16.5523 22 16 22L2 22C1.4477 22 1 21.5523 1 21L1 20C1 16.2721 4.2721 13 8 13ZM9 3C11.0711 3 13 4.9289 13 7C13 9.0711 11.0711 11 9 11C6.9289 11 5 9.0711 5 7C5 4.9289 6.9289 3 9 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 7L23 7"/>
    </svg>
  )
}
