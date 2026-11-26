import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircuitBoard({ size = 24, ...props }: IconProps) {
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
      <path d="M19 12V19C19 21.209 17.2092 23 15 23H5C2.7908 23 1 21.209 1 19V5C1 2.791 2.7908 1 5 1H15C17.2092 1 19 2.791 19 5V12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 7H22M18 12H22M18 17H22M6 18H10M5 2H15C16.6569 2 18 3.343 18 5V19C18 20.657 16.6569 22 15 22H5C3.3431 22 2 20.657 2 19V5C2 3.343 3.3431 2 5 2ZM7 6H13C13.5523 6 14 6.448 14 7V12C14 12.552 13.5523 13 13 13H7C6.4477 13 6 12.552 6 12V7C6 6.448 6.4477 6 7 6Z"/>
      <path d="M15 18C15 18.552 14.5523 19 14 19C13.4477 19 13 18.552 13 18C13 17.448 13.4477 17 14 17C14.5523 17 15 17.448 15 18Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
