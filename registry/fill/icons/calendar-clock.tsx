import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarClock({ size = 24, ...props }: IconProps) {
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
      <path d="M7.754 22L6 22C3.7909 22 2 20.2091 2 18L2 8C2 5.7909 3.7909 4 6 4L18 4C20.0783 4 21.8104 5.5916 21.9857 7.6625C21.9881 7.6906 21.9893 7.7187 21.9893 7.7469C21.9893 8.2992 21.5416 8.7469 20.9893 8.7469C20.7909 8.7469 20.5969 8.6878 20.4321 8.5773C18.9921 7.5513 17.2681 7 15.5 7C10.8056 7 7 10.8056 7 15.5C7 17.2634 7.5485 18.9832 8.5694 20.4211C8.6895 20.5902 8.754 20.7925 8.754 21C8.754 21.5523 8.3063 22 7.754 22Z" fill="currentColor" stroke="none"/>
      <path d="M8 3V7M16 3V6.0132M21 15.5C21 18.5376 18.5376 21 15.5 21C12.4624 21 10 18.5376 10 15.5C10 12.4624 12.4624 10 15.5 10C18.5376 10 21 12.4624 21 15.5ZM15 14.1V16H16.9"/>
    </svg>
  )
}
