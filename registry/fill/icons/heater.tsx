import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Heater({ size = 24, ...props }: IconProps) {
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
      <path d="M18 21L6 21L6 22C6 22.5523 5.5523 23 5 23C4.4477 23 4 22.5523 4 22L4 21C2.3431 21 1 19.6569 1 18L1 7C1 5.3431 2.3431 4 4 4L20 4C21.6569 4 23 5.3431 23 7L23 18C23 19.6569 21.6569 21 20 21L20 22C20 22.5523 19.5523 23 19 23C18.4477 23 18 22.5523 18 22L18 21ZM19 10C19 9.4477 18.5523 9 18 9C17.4477 9 17 9.4477 17 10L17 16C17 16.5523 17.4477 17 18 17C18.5523 17 19 16.5523 19 16L19 10ZM15 10C15 9.4477 14.5523 9 14 9C13.4477 9 13 9.4477 13 10L13 16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16L15 10ZM11 10C11 9.4477 10.5523 9 10 9C9.4477 9 9 9.4477 9 10L9 16C9 16.5523 9.4477 17 10 17C10.5523 17 11 16.5523 11 16L11 10ZM7 10C7 9.4477 6.5523 9 6 9C5.4477 9 5 9.4477 5 10C5 10.5523 5.4477 11 6 11C6.5523 11 7 10.5523 7 10ZM7 14C7 13.4477 6.5523 13 6 13C5.4477 13 5 13.4477 5 14C5 14.5523 5.4477 15 6 15C6.5523 15 7 14.5523 7 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M9 6C9 5.2131 9.3705 4.4721 10 4C10.6295 3.5279 11 2.7869 11 2M14 6C14 5.2131 14.3705 4.4721 15 4C15.6295 3.5279 16 2.7869 16 2" fill="none"/>
    </svg>
  )
}
