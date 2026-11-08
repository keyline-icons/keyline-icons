import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Joystick({ size = 24, ...props }: IconProps) {
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
      <path d="M16 3C18.209 3 20 4.79 20 7C20 9.21 18.209 11 16 11C15.776 11 15.556 10.98 15.341 10.94L14.428 13H21C21.552 13 22 13.45 22 14V20C22 20.55 21.552 21 21 21H3C2.448 21 2 20.55 2 20V14C2 13.45 2.448 13 3 13H12.238L13.514 10.13C12.593 9.4 12 8.27 12 7C12 4.79 13.791 3 16 3Z" fill="currentColor"/>
    </svg>
  )
}
