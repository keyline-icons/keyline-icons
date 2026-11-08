import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BloodPressure({ size = 24, ...props }: IconProps) {
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
      <path d="M7.001 4.5V13.333C7.001 13.441 7.035 13.548 7.106 13.629C7.674 14.279 9.161 15.349 11.501 15.486C11.777 15.502 12.001 15.276 12.001 15V7.5C10.335 7 7.001 5.7 7.001 4.5ZM7.001 4.5C7.001 3 10.501 2 14.001 2C17.501 2 21.001 3 21.001 4.5M21.001 4.5V13.333C21.001 13.441 20.967 13.548 20.896 13.629C20.329 14.279 18.841 15.349 16.501 15.486C16.226 15.502 16.001 15.276 16.001 15V7.5C17.668 7 21.001 5.7 21.001 4.5ZM8.881 20.24C6.425 20.531 3.612 20 3.069 17.71C2.525 15.419 5.335 13.833 7.001 13.5L7.028 13.495M9.778 18.447L8.881 20.24L7.725 22.553"/>
    </svg>
  )
}
