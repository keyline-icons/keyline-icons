import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M6 2L18 2C20.2091 2 22 3.7909 22 6L22 14C22 16.2091 20.2091 18 18 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21L2 6C2 3.7909 3.7909 2 6 2ZM9 9C8.4477 9 8 9.4477 8 10C8 10.5523 8.4477 11 9 11L15 11C15.5523 11 16 10.5523 16 10C16 9.4477 15.5523 9 15 9L9 9Z" fill="currentColor"/>
    </svg>
  )
}
