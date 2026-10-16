import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Wallet({ size = 24, ...props }: IconProps) {
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
      <path d="M5 2L15 2C17.2091 2 19 3.7909 19 6L19 6.127C20.7661 6.583 22 8.176 22 10L22 18C22 20.2091 20.2091 22 18 22L6 22C3.7909 22 2 20.2091 2 18L2 5C2 3.3431 3.3431 2 5 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 3L15 3C16.6569 3 18 4.3431 18 6L18 7C19.6569 7 21 8.3431 21 10L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 5C3 3.8954 3.8954 3 5 3ZM3 5C3 6.1046 3.8954 7 5 7L18 7M21 12L18 12C16.8954 12 16 12.8954 16 14C16 15.1046 16.8954 16 18 16L21 16" fill="none"/>
    </svg>
  )
}
