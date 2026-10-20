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
      <path d="M9 4L2 4L2 16L9 16M9 20L5 20M12 4L22 4L22 20L12 20Z" fill="none"/>
      <path d="M19 15C19 16.1046 18.1046 17 17 17C15.8954 17 15 16.1046 15 15C15 13.8954 15.8954 13 17 13C18.1046 13 19 13.8954 19 15ZM18 8C18 8.5523 17.5523 9 17 9C16.4477 9 16 8.5523 16 8C16 7.4477 16.4477 7 17 7C17.5523 7 18 7.4477 18 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
