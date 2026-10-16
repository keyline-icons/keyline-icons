import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileVideo({ size = 24, ...props }: IconProps) {
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
      <path d="M14 2H8C5.79086 2 4 3.79086 4 6V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V8L14 2ZM14 2V5C14 6.65685 15.3431 8 17 8H20M10.4472 12.1056L14.4472 14.1056C14.786 14.275 15 14.6212 15 15C15 15.3788 14.786 15.725 14.4472 15.8944L10.4472 17.8944C10.3084 17.9639 10.1552 18 10 18C9.4477 18 9 17.5523 9 17L9 13C9 12.4477 9.4477 12 10 12C10.1552 12 10.3084 12.0361 10.4472 12.1056Z"/>
    </svg>
  )
}
