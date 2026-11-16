import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Garage({ size = 24, ...props }: IconProps) {
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
      <path d="M6 22H3C2.448 22 2 21.552 2 21V7L11.544 2.11C11.83 1.963 12.17 1.963 12.456 2.11L22 7V21C22 21.552 21.552 22 21 22H18M18 22V12C18 11.448 17.552 11 17 11H7C6.448 11 6 11.448 6 12V22M18 22H6M22 7H2M11 18H13"/>
    </svg>
  )
}
