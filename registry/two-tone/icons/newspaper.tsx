import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Newspaper({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6C7 3.7909 8.7909 2 11 2L18 2C20.2091 2 22 3.7909 22 6L22 18C22 20.2091 20.2091 22 18 22L6 22C3.7909 22 2 20.2091 2 18L2 11C2 9.3431 3.3431 8 5 8L7 8L7 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 6C8 4.3431 9.3431 3 11 3L18 3C19.6569 3 21 4.3431 21 6L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 11C3 9.8954 3.8954 9 5 9L8 9L8 6ZM8 9L8 18C8 19.4639 6.9434 20.7141 5.5 20.958M12 8L17 8M12 12L17 12M12 16L15 16" fill="none"/>
    </svg>
  )
}
