import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignEndHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M22 21C22.552 21 23 21.448 23 22C23 22.552 22.552 23 22 23H2C1.4477 23 1 22.552 1 22C1 21.448 1.4477 21 2 21H22ZM8 1C9.6569 1 11 2.343 11 4V16C11 17.657 9.6568 19 8 19H6C4.3432 19 3 17.657 3 16V4C3 2.343 4.3431 1 6 1H8Z" fill="currentColor"/>
      <path d="M18 9C19.6569 9 21 10.343 21 12V16C21 17.657 19.6569 19 18 19H16C14.3431 19 13 17.657 13 16V12C13 10.343 14.3431 9 16 9H18Z" fill="currentColor"/>
    </svg>
  )
}
