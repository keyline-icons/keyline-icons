import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MonitorSpeaker({ size = 24, ...props }: IconProps) {
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
      <path d="M15 3L19 3C21.2092 3 23 4.7908 23 7L23 17C23 19.2092 21.2092 21 19 21L15 21C12.7908 21 11 19.2092 11 17L11 7C11 4.7908 12.7908 3 15 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 4L5 4C3.3431 4 2 5.3431 2 7L2 13C2 14.6569 3.3431 16 5 16L8 16M8 20L6 20M15 4L19 4C20.6569 4 22 5.3431 22 7L22 17C22 18.6569 20.6569 20 19 20L15 20C13.3431 20 12 18.6569 12 17L12 7C12 5.3431 13.3431 4 15 4Z" fill="none"/>
      <path d="M19 15C19 16.1046 18.1046 17 17 17C15.8954 17 15 16.1046 15 15C15 13.8954 15.8954 13 17 13C18.1046 13 19 13.8954 19 15ZM18 8C18 8.5523 17.5523 9 17 9C16.4477 9 16 8.5523 16 8C16 7.4477 16.4477 7 17 7C17.5523 7 18 7.4477 18 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
