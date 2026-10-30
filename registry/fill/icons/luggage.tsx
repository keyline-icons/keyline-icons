import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Luggage({ size = 24, ...props }: IconProps) {
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
      <path d="M7 5L17 5C18.6569 5 20 6.3431 20 8L20 18C20 19.6569 18.6569 21 17 21L7 21C5.3431 21 4 19.6569 4 18L4 8C4 6.3431 5.3431 5 7 5ZM7 10C6.4477 10 6 10.4477 6 11C6 11.5523 6.4477 12 7 12L17 12C17.5523 12 18 11.5523 18 11C18 10.4477 17.5523 10 17 10L7 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 6L8.6213 3.5149C8.8439 2.6246 9.6438 2 10.5616 2L13.4384 2C14.3562 2 15.1561 2.6246 15.3787 3.5149L16 6M7 20L7 22M17 20L17 22" fill="none"/>
    </svg>
  )
}
