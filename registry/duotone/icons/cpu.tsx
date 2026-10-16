import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cpu({ size = 24, ...props }: IconProps) {
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
      <path d="M7 3L17 3C19.2091 3 21 4.7909 21 7L21 17C21 19.2091 19.2091 21 17 21L7 21C4.7909 21 3 19.2091 3 17L3 7C3 4.7909 4.7909 3 7 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 8L15 8C15.5523 8 16 8.4477 16 9L16 15C16 15.5523 15.5523 16 15 16L9 16C8.4477 16 8 15.5523 8 15L8 9C8 8.4477 8.4477 8 9 8ZM9 4L9 2M9 20L9 22M4 9L2 9M20 9L22 9M15 4L15 2M15 20L15 22M4 15L2 15M20 15L22 15"/>
    </svg>
  )
}
