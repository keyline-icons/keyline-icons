import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SprayCan({ size = 24, ...props }: IconProps) {
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
      <path d="M20 8L22 8C22.5523 8 23 8.4477 23 9L23 22C23 22.5523 22.5523 23 22 23L12 23C11.4477 23 11 22.5523 11 22L11 9C11 8.4477 11.4477 8 12 8L14 8L14 4C14 3.4477 14.4477 3 15 3C15.0818 3 15.1632 3.01 15.2425 3.0299L19.2425 4.0299C19.6877 4.1411 20 4.5411 20 5L20 8Z" fill="currentColor"/>
      <path d="M3 2C3 2.5523 2.5523 3 2 3C1.4477 3 1 2.5523 1 2C1 1.4477 1.4477 1 2 1C2.5523 1 3 1.4477 3 2ZM3 6C3 6.5523 2.5523 7 2 7C1.4477 7 1 6.5523 1 6C1 5.4477 1.4477 5 2 5C2.5523 5 3 5.4477 3 6ZM3 10C3 10.5523 2.5523 11 2 11C1.4477 11 1 10.5523 1 10C1 9.4477 1.4477 9 2 9C2.5523 9 3 9.4477 3 10ZM7 4C7 4.5523 6.5523 5 6 5C5.4477 5 5 4.5523 5 4C5 3.4477 5.4477 3 6 3C6.5523 3 7 3.4477 7 4ZM7 8C7 8.5523 6.5523 9 6 9C5.4477 9 5 8.5523 5 8C5 7.4477 5.4477 7 6 7C6.5523 7 7 7.4477 7 8ZM11 6C11 6.5523 10.5523 7 10 7C9.4477 7 9 6.5523 9 6C9 5.4477 9.4477 5 10 5C10.5523 5 11 5.4477 11 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
