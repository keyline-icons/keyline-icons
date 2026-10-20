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
      <path d="M8 4L5 4C3.3431 4 2 5.3431 2 7L2 13C2 14.6569 3.3431 16 5 16L8 16M8 20L6 20" fill="none" strokeOpacity="0.4"/>
      <path d="M15 3L19 3C21.2092 3 23 4.7908 23 7L23 17C23 19.2092 21.2092 21 19 21L15 21C12.7908 21 11 19.2092 11 17L11 7C11 4.7908 12.7908 3 15 3ZM19 15C19 13.8954 18.1046 13 17 13C15.8954 13 15 13.8954 15 15C15 16.1046 15.8954 17 17 17C18.1046 17 19 16.1046 19 15ZM18 8C18 7.4477 17.5523 7 17 7C16.4477 7 16 7.4477 16 8C16 8.5523 16.4477 9 17 9C17.5523 9 18 8.5523 18 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
