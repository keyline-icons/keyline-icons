import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cable({ size = 24, ...props }: IconProps) {
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
      <path d="M15 1L19 1C20.1046 1 21 1.8954 21 3L21 5C21 6.1046 20.1046 7 19 7L15 7C13.8954 7 13 6.1046 13 5L13 3C13 1.8954 13.8954 1 15 1ZM5 17L9 17C10.1046 17 11 17.8954 11 19L11 21C11 22.1046 10.1046 23 9 23L5 23C3.8954 23 3 22.1046 3 21L3 19C3 17.8954 3.8954 17 5 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14 4L6 4C3.7909 4 2 5.7909 2 8C2 10.2091 3.7909 12 6 12L18 12C20.2091 12 22 13.7909 22 16C22 18.2091 20.2091 20 18 20L10 20M15 2L19 2C19.5523 2 20 2.4477 20 3L20 5C20 5.5523 19.5523 6 19 6L15 6C14.4477 6 14 5.5523 14 5L14 3C14 2.4477 14.4477 2 15 2ZM5 18L9 18C9.5523 18 10 18.4477 10 19L10 21C10 21.5523 9.5523 22 9 22L5 22C4.4477 22 4 21.5523 4 21L4 19C4 18.4477 4.4477 18 5 18ZM20 4L22 4M4 20L2 20"/>
    </svg>
  )
}
