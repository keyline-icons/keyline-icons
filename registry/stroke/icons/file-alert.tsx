import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileAlert({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2L8 2C5.7909 2 4 3.7909 4 6L4 18C4 20.2091 5.7909 22 8 22L10 22M14 2L20 8L20 12M14 2L14 5C14 6.6569 15.3431 8 17 8L20 8M17 16L17 18" fill="none"/>
      <path d="M18 22C18 22.5523 17.5523 23 17 23C16.4477 23 16 22.5523 16 22C16 21.4477 16.4477 21 17 21C17.5523 21 18 21.4477 18 22Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
