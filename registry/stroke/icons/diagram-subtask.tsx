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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 3L13 3C13.5523 3 14 3.4477 14 4L14 7C14 7.5523 13.5523 8 13 8L4 8C3.4477 8 3 7.5523 3 7L3 4C3 3.4477 3.4477 3 4 3ZM11 16L20 16C20.5523 16 21 16.4477 21 17L21 20C21 20.5523 20.5523 21 20 21L11 21C10.4477 21 10 20.5523 10 20L10 17C10 16.4477 10.4477 16 11 16ZM6 8L6 17.5C6 18.0523 6.4477 18.5 7 18.5L10 18.5" fill="none"/>
    </svg>
  )
}
