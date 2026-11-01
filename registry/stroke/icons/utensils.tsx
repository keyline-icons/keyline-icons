import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Utensils({ size = 24, ...props }: IconProps) {
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
      <path d="M16 2C17.6568 2 19 3.7909 19 6C19 8.2091 17.6568 10 16 10C14.3431 10 13 8.2091 13 6C13 3.7909 14.3431 2 16 2ZM5 13L8.5 13C8.7761 13 9 12.7761 9 12.5L9 8.862C9 6.1485 7.6021 3.6263 5.301 2.1881C5.17 2.1062 5 2.2005 5 2.355ZM16 10L16 22M5 13L5 22" fill="none"/>
    </svg>
  )
}
