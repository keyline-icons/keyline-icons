import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M14 13C15.6569 13 17 14.343 17 16V18C17 19.657 15.6569 21 14 21H10C8.3432 21 7 19.657 7 18V16C7 14.343 8.3432 13 10 13H14ZM18 3C19.6569 3 21 4.343 21 6V8C21 9.657 19.6569 11 18 11H6C4.3431 11 3 9.657 3 8V6C3 4.343 4.3431 3 6 3H18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22 19C22.5523 19 23 19.448 23 20C23 20.552 22.5523 21 22 21H2C1.4477 21 1 20.552 1 20C1 19.448 1.4477 19 2 19H22ZM22 9C22.5523 9 23 9.448 23 10C23 10.552 22.5523 11 22 11H2C1.4477 11 1 10.552 1 10C1 9.448 1.4477 9 2 9H22Z" fill="currentColor"/>
    </svg>
  )
}
