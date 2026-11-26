import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M10 12C10.3396 12 10.6733 12.0255 11 12.0723L11 22L2 22C1.4477 22 1 21.5523 1 21L1 19C1 15.134 4.134 12 8 12ZM9 2C11.2092 2 13 3.7908 13 6C13 8.2092 11.2092 10 9 10C6.7909 10 5 8.2092 5 6C5 3.7908 6.7909 2 9 2ZM18.2504 13.3369L22.3358 14.7933C22.7341 14.9352 23 15.3124 23 15.7352C23 16.1185 22.7809 16.4681 22.4358 16.6352L19.2713 18.1677L17.4856 21.4751C17.3111 21.7984 16.9732 22 16.6057 22C16.1773 22 15.7965 21.7271 15.6588 21.3215L12.8823 13.144C12.8471 13.0405 12.8292 12.9318 12.8292 12.8225C12.8292 12.2702 13.2769 11.8225 13.8292 11.8225C13.9436 11.8225 14.0572 11.8421 14.165 11.8806Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 3C10.6569 3 12 4.3431 12 6C12 7.6569 10.6569 9 9 9C7.3432 9 6 7.6569 6 6C6 4.3431 7.3432 3 9 3ZM11 21L2 21L2 19C2 15.6863 4.6863 13 8 13L10 13C10.2768 13 10.5533 13.0192 10.8274 13.0573M16.6057 21L13.8292 12.8225L22 15.7352L18.5448 17.4084L16.6057 21Z"/>
    </svg>
  )
}
