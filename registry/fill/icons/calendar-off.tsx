import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.8284 20.8284C20.1046 21.5523 19.1046 22 18 22L6 22C3.7909 22 2 20.2091 2 18L2 8C2 6.3778 2.9657 4.9811 4.3535 4.3535ZM9.9497 5.7071C9.6637 5.4211 9.5782 4.991 9.733 4.6173C9.8878 4.2436 10.2524 4 10.6569 4L18 4C20.2091 4 22 5.7909 22 8L22 15.3431C22 15.7476 21.7564 16.1122 21.3827 16.267C21.009 16.4218 20.5789 16.3363 20.2929 16.0503L9.9497 5.7071ZM12 12L7 12C6.4477 12 6 11.5523 6 11C6 10.4477 6.4477 10 7 10L10 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M16 3L16 7M2 2L22 22"/>
    </svg>
  )
}
