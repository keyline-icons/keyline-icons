import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignCenterHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M18 3C19.6568 3 21 4.3431 21 6V11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H21V18C21 19.6569 19.6569 21 18 21H16C14.3432 21 13 19.6569 13 18V13H11V14C11 15.6569 9.6569 17 8 17H6C4.3431 17 3 15.6569 3 14V13H2C1.4477 13 1 12.5523 1 12C1 11.4477 1.4477 11 2 11H3V10C3 8.3431 4.3431 7 6 7H8C9.6569 7 11 8.3431 11 10V11H13V6C13 4.3431 14.3431 3 16 3H18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 12H4M10 12H14M20 12H22M6 8H8C9.1046 8 10 8.8954 10 10V14C10 15.1046 9.1046 16 8 16H6C4.8954 16 4 15.1046 4 14V10C4 8.8954 4.8954 8 6 8ZM16 4H18C19.1045 4 20 4.8954 20 6V18C20 19.1046 19.1046 20 18 20H16C14.8955 20 14 19.1046 14 18V6C14 4.8954 14.8954 4 16 4Z"/>
    </svg>
  )
}
