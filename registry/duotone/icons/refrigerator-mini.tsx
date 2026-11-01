import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RefrigeratorMini({ size = 24, ...props }: IconProps) {
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
      <path d="M4 21C2.3431 21 1 19.6569 1 18L1 4C1 2.3431 2.3431 1 4 1L20 1C21.6569 1 23 2.3431 23 4L23 18C23 19.6569 21.6569 21 20 21L20 22C20 22.5523 19.5523 23 19 23C18.4477 23 18 22.5523 18 22L18 21L6 21L6 22C6 22.5523 5.5523 23 5 23C4.4477 23 4 22.5523 4 22L4 21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 10L20 10" fill="none"/>
      <path d="M13 19L13 18C13 16.7285 13.8013 15.595 15 15.171L15 14C15 13.4477 15.4477 13 16 13C16.5523 13 17 13.4477 17 14L17 15.171C18.1987 15.595 19 16.7285 19 18L19 19L17 19L17 18C17 17.4477 16.5523 17 16 17C15.4477 17 15 17.4477 15 18L15 19L13 19ZM5 19L5 18C5 16.7285 5.8013 15.595 7 15.171L7 14C7 13.4477 7.4477 13 8 13C8.5523 13 9 13.4477 9 14L9 15.171C10.1987 15.595 11 16.7285 11 18L11 19L9 19L9 18C9 17.4477 8.5523 17 8 17C7.4477 17 7 17.4477 7 18L7 19L5 19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7 6C7 6.5523 6.5523 7 6 7C5.4477 7 5 6.5523 5 6C5 5.4477 5.4477 5 6 5C6.5523 5 7 5.4477 7 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
