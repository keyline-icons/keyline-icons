import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BedSingle({ size = 24, ...props }: IconProps) {
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
      <path d="M3 20L3 11C3 10.4477 3.4477 10 4 10L6 10L6 4C6 3.4477 6.4477 3 7 3L17 3C17.5523 3 18 3.4477 18 4L18 10L20 10C20.5523 10 21 10.4477 21 11L21 20C21 20.5523 20.5523 21 20 21L4 21C3.4477 21 3 20.5523 3 20ZM5 12L5 14L19 14L19 12L5 12Z" fill="currentColor"/>
    </svg>
  )
}
