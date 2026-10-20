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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 3L22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L12 21C11.4477 21 11 20.5523 11 20L11 4C11 3.4477 11.4477 3 12 3ZM19 15C19 13.8954 18.1046 13 17 13C15.8954 13 15 13.8954 15 15C15 16.1046 15.8954 17 17 17C18.1046 17 19 16.1046 19 15ZM18 8C18 7.4477 17.5523 7 17 7C16.4477 7 16 7.4477 16 8C16 8.5523 16.4477 9 17 9C17.5523 9 18 8.5523 18 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M9 4L2 4L2 16L9 16M9 20L5 20" fill="none"/>
    </svg>
  )
}
