import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BanknoteCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M4 1L20 1C21.6569 1 23 2.3431 23 4L23 12C23 12.5523 22.5523 13 22 13L16 13C14.3431 13 13 14.3431 13 16C13 16.5523 12.5523 17 12 17L4 17C2.3431 17 1 15.6569 1 14L1 4C1 2.3431 2.3431 1 4 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 12L22 4C22 2.8954 21.1046 2 20 2L4 2C2.8954 2 2 2.8954 2 4L2 14C2 15.1046 2.8954 16 4 16L12 16M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.8954 10.8954 7 12 7C13.1046 7 14 7.8954 14 9ZM17 6L18 6M7 12L6 12M16 19.6L18.3333 22L22 16"/>
    </svg>
  )
}
