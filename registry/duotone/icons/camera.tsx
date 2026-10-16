import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Camera({ size = 24, ...props }: IconProps) {
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
      <path d="M1 9C1 6.7909 2.7909 5 5 5L7 5L7.9 3.8C8.2777 3.2964 8.8705 3 9.5 3L14.5 3C15.1295 3 15.7223 3.2964 16.1 3.8L17 5L19 5C21.2091 5 23 6.7909 23 9L23 17C23 19.2091 21.2091 21 19 21L5 21C2.7909 21 1 19.2091 1 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"/>
    </svg>
  )
}
