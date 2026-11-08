import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalDistributeCenter({ size = 24, ...props }: IconProps) {
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
      <path d="M8 1V4H10C10.552 4 11 4.448 11 5V19C11 19.552 10.552 20 10 20H8V23H6V20H4C3.448 20 3 19.552 3 19V5C3 4.448 3.448 4 4 4H6V1H8ZM18 1V6H20C20.552 6 21 6.448 21 7V17C21 17.552 20.552 18 20 18H18V23H16V18H14C13.448 18 13 17.552 13 17V7C13 6.448 13.448 6 14 6H16V1H18Z" fill="currentColor"/>
    </svg>
  )
}
