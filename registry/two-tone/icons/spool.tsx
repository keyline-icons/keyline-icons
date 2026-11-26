import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Spool({ size = 24, ...props }: IconProps) {
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
      <path d="M6 7C4.3431 7 3 5.6569 3 4C3 2.3431 4.3431 1 6 1L12 1L18 1C19.6569 1 21 2.3431 21 4C21 5.6569 19.6569 7 18 7L18 17C19.6569 17 21 18.3431 21 20C21 21.6569 19.6569 23 18 23L6 23C4.3431 23 3 21.6569 3 20C3 18.3431 4.3431 17 6 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 2L18 2C19.1046 2 20 2.8954 20 4C20 5.1046 19.1046 6 18 6L6 6C4.8954 6 4 5.1046 4 4C4 2.8954 4.8954 2 6 2ZM6 18L18 18C19.1046 18 20 18.8954 20 20C20 21.1046 19.1046 22 18 22L6 22C4.8954 22 4 21.1046 4 20C4 18.8954 4.8954 18 6 18ZM7 6V18M17 6V18M7 13.5L17 10.5"/>
    </svg>
  )
}
