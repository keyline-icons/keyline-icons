import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarAlert({ size = 24, ...props }: IconProps) {
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
      <path d="M6 4H18C20.209 4 22 5.791 22 8V11C22 11.552 21.552 12 21 12H15C13.343 12 12 13.343 12 15V21C12 21.552 11.552 22 11 22H6C3.791 22 2 20.209 2 18V8C2 5.791 3.791 4 6 4ZM7 10C6.448 10 6 10.448 6 11C6 11.552 6.448 12 7 12H17C17.552 12 18 11.552 18 11C18 10.448 17.552 10 17 10H7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 3V7M16 3V7M18 15V17"/>
      <path d="M18 20C18.552 20 19 20.448 19 21C19 21.552 18.552 22 18 22C17.448 22 17 21.552 17 21C17 20.448 17.448 20 18 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
