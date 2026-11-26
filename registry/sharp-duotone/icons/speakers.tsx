import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Speakers({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 4L2 4L2 20L5 20" strokeOpacity="0.4"/>
      <path d="M19 15.0001C19 17.2092 17.2091 19.0001 15 19.0001C12.7909 19.0001 11 17.2092 11 15.0001C11 12.791 12.7909 11.0001 15 11.0001C17.2091 11.0001 19 12.791 19 15.0001ZM17 15.0001C17 13.8955 16.1046 13.0001 15 13.0001C13.8954 13.0001 13 13.8955 13 15.0001C13 16.1047 13.8954 17.0001 15 17.0001C16.1046 17.0001 17 16.1047 17 15.0001ZM16.5 7.0001C16.5 7.8285 15.8284 8.5001 15 8.5001C14.1716 8.5001 13.5 7.8285 13.5 7.0001C13.5 6.1717 14.1716 5.5001 15 5.5001C15.8284 5.5001 16.5 6.1717 16.5 7.0001Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 1L22 1C22.5523 1 23 1.4477 23 2L23 22C23 22.5523 22.5523 23 22 23L8 23C7.4477 23 7 22.5523 7 22L7 2C7 1.4477 7.4477 1 8 1ZM19 15C19 12.7909 17.2091 11 15 11C12.7909 11 11 12.7909 11 15C11 17.2091 12.7909 19 15 19C17.2091 19 19 17.2091 19 15ZM17 15C17 16.1046 16.1046 17 15 17C13.8954 17 13 16.1046 13 15C13 13.8954 13.8954 13 15 13C16.1046 13 17 13.8954 17 15ZM16.5 7C16.5 6.1716 15.8284 5.5 15 5.5C14.1716 5.5 13.5 6.1716 13.5 7C13.5 7.8284 14.1716 8.5 15 8.5C15.8284 8.5 16.5 7.8284 16.5 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
