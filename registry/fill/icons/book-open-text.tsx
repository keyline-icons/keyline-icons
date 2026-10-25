import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BookOpenText({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L8 3C9.5738 3 11.0557 3.741 12 5C12.9443 3.741 14.4262 3 16 3L20 3C21.6569 3 23 4.3431 23 6L23 15C23 16.6569 21.6569 18 20 18L15 18C13.8954 18 13 18.8954 13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20C11 18.8954 10.1046 18 9 18L4 18C2.3431 18 1 16.6569 1 15L1 6C1 4.3431 2.3431 3 4 3ZM11 4L11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15L13 4C12.621 4.2843 12.2843 4.621 12 5C11.7157 4.621 11.379 4.2843 11 4ZM6 8C5.4477 8 5 8.4477 5 9C5 9.5523 5.4477 10 6 10L8 10C8.5523 10 9 9.5523 9 9C9 8.4477 8.5523 8 8 8L6 8ZM6 12C5.4477 12 5 12.4477 5 13C5 13.5523 5.4477 14 6 14L8 14C8.5523 14 9 13.5523 9 13C9 12.4477 8.5523 12 8 12L6 12ZM16 8C15.4477 8 15 8.4477 15 9C15 9.5523 15.4477 10 16 10L18 10C18.5523 10 19 9.5523 19 9C19 8.4477 18.5523 8 18 8L16 8ZM16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14L18 14C18.5523 14 19 13.5523 19 13C19 12.4477 18.5523 12 18 12L16 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
