import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function User({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C14.0711 2 16 3.9289 16 6C16 8.0711 14.0711 10 12 10C9.9289 10 8 8.0711 8 6C8 3.9289 9.9289 2 12 2ZM11 12L13 12C16.7279 12 20 15.2721 20 19L20 21C20 21.5523 19.5523 22 19 22L5 22C4.4477 22 4 21.5523 4 21L4 19C4 15.2721 7.2721 12 11 12Z" fill="currentColor"/>
    </svg>
  )
}
