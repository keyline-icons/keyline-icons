import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pause({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 3L9 3C9.5523 3 10 3.4477 10 4L10 20C10 20.5523 9.5523 21 9 21L5 21C4.4477 21 4 20.5523 4 20L4 4C4 3.4477 4.4477 3 5 3ZM15 3L19 3C19.5523 3 20 3.4477 20 4L20 20C20 20.5523 19.5523 21 19 21L15 21C14.4477 21 14 20.5523 14 20L14 4C14 3.4477 14.4477 3 15 3Z" fill="currentColor"/>
    </svg>
  )
}
