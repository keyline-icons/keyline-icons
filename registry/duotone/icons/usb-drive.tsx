import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UsbDrive({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L12 3C13.2713 3 14.4046 3.8014 14.8284 5L20 5C21.6569 5 23 6.3431 23 8L23 16C23 17.6569 21.6569 19 20 19L14.8284 19C14.4046 20.1986 13.2713 21 12 21L4 21C2.3431 21 1 19.6569 1 18L1 6C1 4.3431 2.3431 3 4 3Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M4 3L12 3C13.6569 3 15 4.3431 15 6L15 18C15 19.6569 13.6569 21 12 21L4 21C2.3431 21 1 19.6569 1 18L1 6C1 4.3431 2.3431 3 4 3ZM19 10C19 10.5523 18.5523 11 18 11C17.4477 11 17 10.5523 17 10C17 9.4477 17.4477 9 18 9C18.5523 9 19 9.4477 19 10ZM19 14C19 14.5523 18.5523 15 18 15C17.4477 15 17 14.5523 17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
