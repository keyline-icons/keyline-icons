import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Grid3x3({ size = 24, ...props }: IconProps) {
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
      <path d="M22 3L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2L21 2C21.5523 2 22 2.4477 22 3ZM8 8L4 8L4 10L8 10L8 14L4 14L4 16L8 16L8 20L10 20L10 16L14 16L14 20L16 20L16 16L20 16L20 14L16 14L16 10L20 10L20 8L16 8L16 4L14 4L14 8L10 8L10 4L8 4ZM10 10L10 14L14 14L14 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
