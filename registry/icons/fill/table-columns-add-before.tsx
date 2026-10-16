import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableColumnsAddBefore({ size = 24, ...props }: IconProps) {
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
      <path d="M13 21L13 3L19 3C20.6569 3 22 4.3431 22 6L22 18C22 19.6569 20.6569 21 19 21L13 21Z" fill="currentColor" stroke="none"/>
      <path d="M4.1716 19C4.5954 20.1986 5.7287 21 7 21L19 21C20.6569 21 22 19.6569 22 18L22 6C22 4.3431 20.6569 3 19 3L7 3C5.7287 3 4.5954 3.8014 4.1716 5M13 21L13 3M5 9L5 15M2 12L8 12"/>
    </svg>
  )
}
