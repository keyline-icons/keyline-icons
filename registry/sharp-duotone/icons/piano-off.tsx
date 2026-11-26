import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PianoOff({ size = 24, ...props }: IconProps) {
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
      <path d="M6 6V13C6.552 13 7 13.448 7 14V20C7 20.552 6.552 21 6 21H2C1.448 21 1 20.552 1 20V4C1 3.448 1.448 3 2 3H3L6 6ZM21 21H10C9.448 21 9 20.552 9 20V14C9 13.448 9.448 13 10 13V10L21 21ZM6.657 3H12H22C22.552 3 23 3.448 23 4V19.343L16.657 13H18V5H14V10.343L6.657 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
