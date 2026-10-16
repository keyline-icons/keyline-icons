import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DiagramSubtask({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 2L14 2C14.5523 2 15 2.4477 15 3L15 8C15 8.5523 14.5523 9 14 9L3 9C2.4477 9 2 8.5523 2 8L2 3C2 2.4477 2.4477 2 3 2ZM10 15L21 15C21.5523 15 22 15.4477 22 16L22 21C22 21.5523 21.5523 22 21 22L10 22C9.4477 22 9 21.5523 9 21L9 16C9 15.4477 9.4477 15 10 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 3L14 3L14 8L3 8L3 3ZM10 16L21 16L21 21L10 21L10 16ZM6 8L6 18.5L10 18.5" fill="none"/>
    </svg>
  )
}
