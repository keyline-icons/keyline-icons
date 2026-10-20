import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2L6 2C7.1046 2 8 2.8954 8 4L8 6C8 7.1046 7.1046 8 6 8L4 8C2.8954 8 2 7.1046 2 6L2 4C2 2.8954 2.8954 2 4 2ZM18 2L20 2C21.1046 2 22 2.8954 22 4L22 6C22 7.1046 21.1046 8 20 8L18 8C16.8954 8 16 7.1046 16 6L16 4C16 2.8954 16.8954 2 18 2ZM4 16L6 16C7.1046 16 8 16.8954 8 18L8 20C8 21.1046 7.1046 22 6 22L4 22C2.8954 22 2 21.1046 2 20L2 18C2 16.8954 2.8954 16 4 16ZM18 16L20 16C21.1046 16 22 16.8954 22 18L22 20C22 21.1046 21.1046 22 20 22L18 22C16.8954 22 16 21.1046 16 20L16 18C16 16.8954 16.8954 16 18 16Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M4 3L6 3C6.5523 3 7 3.4477 7 4L7 6C7 6.5523 6.5523 7 6 7L4 7C3.4477 7 3 6.5523 3 6L3 4C3 3.4477 3.4477 3 4 3ZM18 3L20 3C20.5523 3 21 3.4477 21 4L21 6C21 6.5523 20.5523 7 20 7L18 7C17.4477 7 17 6.5523 17 6L17 4C17 3.4477 17.4477 3 18 3ZM4 17L6 17C6.5523 17 7 17.4477 7 18L7 20C7 20.5523 6.5523 21 6 21L4 21C3.4477 21 3 20.5523 3 20L3 18C3 17.4477 3.4477 17 4 17ZM18 17L20 17C20.5523 17 21 17.4477 21 18L21 20C21 20.5523 20.5523 21 20 21L18 21C17.4477 21 17 20.5523 17 20L17 18C17 17.4477 17.4477 17 18 17ZM7 5L17 5M7 19L17 19M5 7L5 17M19 7L19 17" fill="none"/>
    </svg>
  )
}
