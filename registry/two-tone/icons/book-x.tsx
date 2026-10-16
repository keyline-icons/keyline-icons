import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BookX({ size = 24, ...props }: IconProps) {
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
      <path d="M7 1L17 1C19.2091 1 21 2.7909 21 5L21 12C21 12.5523 20.5523 13 20 13L14 13C12.3431 13 11 14.3431 11 16L11 22C11 22.5523 10.5523 23 10 23L6 23C4.3431 23 3 21.6569 3 20L3 5C3 2.7909 4.7909 1 7 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 12L20 5C20 3.3431 18.6569 2 17 2L7 2C5.3431 2 4 3.3431 4 5L4 20M10 22L6 22C4.8954 22 4 21.1046 4 20C4 18.8954 4.8954 18 6 18L10 18M8 6L8 14M14 16L20 22M20 16L14 22" fill="none"/>
    </svg>
  )
}
