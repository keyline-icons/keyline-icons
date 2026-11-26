import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeyboardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21 21H2C1.448 21 1 20.5523 1 20V4C1 3.4477 1.448 3 2 3H3L21 21ZM6.743 3H22C22.552 3 23 3.4477 23 4V19.2574L6.743 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 11H7V13H5V11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M20 20H2V4H4M7 16H16M1.707 1.7071L22.293 22.293"/>
    </svg>
  )
}
