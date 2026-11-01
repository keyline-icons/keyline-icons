import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RefrigeratorMini({ size = 24, ...props }: IconProps) {
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
      <path d="M5 21L4 21C2.3431 21 1 19.6569 1 18L1 4C1 2.3431 2.3431 1 4 1L20 1C21.6569 1 23 2.3431 23 4L23 18C23 19.6569 21.6569 21 20 21L5 21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 20L4 20C2.8954 20 2 19.1046 2 18L2 4C2 2.8954 2.8954 2 4 2L20 2C21.1046 2 22 2.8954 22 4L22 18C22 19.1046 21.1046 20 20 20L5 20ZM2 10L22 10M5 20L5 22M19 20L19 22M6 20L6 18C6 16.8954 6.8954 16 8 16M10 20L10 18C10 16.8954 9.1046 16 8 16M8 16L8 14M14 20L14 18C14 16.8954 14.8954 16 16 16M18 20L18 18C18 16.8954 17.1046 16 16 16M16 16L16 14" fill="none"/>
      <path d="M7 6C7 6.5523 6.5523 7 6 7C5.4477 7 5 6.5523 5 6C5 5.4477 5.4477 5 6 5C6.5523 5 7 5.4477 7 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
