import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Curtains({ size = 24, ...props }: IconProps) {
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
      <path d="M21 2C21.552 2 22 2.448 22 3C22 3.552 21.552 4 21 4V21C21 21.552 20.552 22 20 22H4C3.448 22 3 21.552 3 21V4C2.448 4 2 3.552 2 3C2 2.448 2.448 2 3 2H21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 3H21M4 3V21H20V3M12 3V21M8 3V9M16 3V9"/>
    </svg>
  )
}
