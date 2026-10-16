import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Input({ size = 24, ...props }: IconProps) {
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
      <path d="M1 9C1 7.3431 2.3431 6 4 6L20 6C21.6569 6 23 7.3431 23 9L23 15C23 16.6569 21.6569 18 20 18L4 18C2.3431 18 1 16.6569 1 15L1 9ZM7 11C7 10.4477 6.5523 10 6 10C5.4477 10 5 10.4477 5 11L5 13C5 13.5523 5.4477 14 6 14C6.5523 14 7 13.5523 7 13L7 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
