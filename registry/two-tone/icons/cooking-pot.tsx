import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CookingPot({ size = 24, ...props }: IconProps) {
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
      <path d="M3 11C3 10.4477 3.4477 10 4 10L20 10C20.5523 10 21 10.4477 21 11L21 18C21 20.2092 19.2092 22 17 22L7 22C4.7908 22 3 20.2092 3 18L3 11ZM7 7L7 6C7 3.7908 8.7908 2 11 2L13 2C15.2092 2 17 3.7908 17 6L17 7C17 7.5523 16.5523 8 16 8L8 8C7.4477 8 7 7.5523 7 7Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M4 11L4 18C4 19.6569 5.3431 21 7 21L17 21C18.6569 21 20 19.6569 20 18L20 11M2 11L22 11M4 7L20 7M8 7L8 6C8 4.3431 9.3431 3 11 3L13 3C14.6569 3 16 4.3431 16 6L16 7" fill="none"/>
    </svg>
  )
}
