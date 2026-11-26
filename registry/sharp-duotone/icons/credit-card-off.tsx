import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CreditCardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.88 21H2C1.448 21 1 20.552 1 20V4C1 3.448 1.448 3 2 3H2.88L7.88 8H3V10H9.88L20.88 21ZM6.657 3H22C22.552 3 23 3.448 23 4V19.343L13.657 10H21V8H11.657L6.657 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
