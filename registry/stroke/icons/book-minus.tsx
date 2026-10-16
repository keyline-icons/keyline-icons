import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BookMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M20 12L20 5C20 3.3431 18.6569 2 17 2L7 2C5.3431 2 4 3.3431 4 5L4 20M10 22L6 22C4.8954 22 4 21.1046 4 20C4 18.8954 4.8954 18 6 18L10 18M8 6L8 14M14 19H20" fill="none"/>
    </svg>
  )
}
