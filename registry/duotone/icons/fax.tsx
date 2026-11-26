import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Fax({ size = 24, ...props }: IconProps) {
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
      <path d="M19 8.126C20.7253 8.57 22 10.1361 22 12L22 18C22 20.2092 20.2092 22 18 22L6 22C3.7908 22 2 20.2092 2 18L2 11.5L2 5C2 3.3431 3.3431 2 5 2L7 2C8.6569 2 10 3.3431 10 5L10 8L12 8L12 6C12 4.8954 12.8954 4 14 4L17 4C18.1046 4 19 4.8954 19 6Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M4 11.5L4 18C4 19.1046 4.8954 20 6 20L8 20L8 9L8 5C8 4.4477 7.5523 4 7 4L5 4C4.4477 4 4 4.4477 4 5ZM15.5 8L17 8L17 6L14 6L14 8ZM14 13C14 13.5523 13.5523 14 13 14C12.4477 14 12 13.5523 12 13C12 12.4477 12.4477 12 13 12C13.5523 12 14 12.4477 14 13ZM18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13ZM14 17C14 17.5523 13.5523 18 13 18C12.4477 18 12 17.5523 12 17C12 16.4477 12.4477 16 13 16C13.5523 16 14 16.4477 14 17ZM18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="currentColor"/>
    </svg>
  )
}
