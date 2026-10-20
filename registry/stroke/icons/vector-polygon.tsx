import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorPolygon({ size = 24, ...props }: IconProps) {
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
      <path d="M11 2L13 2C13.5523 2 14 2.4477 14 3L14 5C14 5.5523 13.5523 6 13 6L11 6C10.4477 6 10 5.5523 10 5L10 3C10 2.4477 10.4477 2 11 2ZM19 8L21 8C21.5523 8 22 8.4477 22 9L22 11C22 11.5523 21.5523 12 21 12L19 12C18.4477 12 18 11.5523 18 11L18 9C18 8.4477 18.4477 8 19 8ZM16 18L18 18C18.5523 18 19 18.4477 19 19L19 21C19 21.5523 18.5523 22 18 22L16 22C15.4477 22 15 21.5523 15 21L15 19C15 18.4477 15.4477 18 16 18ZM6 18L8 18C8.5523 18 9 18.4477 9 19L9 21C9 21.5523 8.5523 22 8 22L6 22C5.4477 22 5 21.5523 5 21L5 19C5 18.4477 5.4477 18 6 18ZM3 8L5 8C5.5523 8 6 8.4477 6 9L6 11C6 11.5523 5.5523 12 5 12L3 12C2.4477 12 2 11.5523 2 11L2 9C2 8.4477 2.4477 8 3 8ZM14 5.5L18 8.5M19.4 12L17.6 18M15 20L9 20M6.4 18L4.6 12M6 8.5L10 5.5" fill="none"/>
    </svg>
  )
}
