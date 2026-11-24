import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stairs({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22L4 22C2.3431 22 1 20.6569 1 19L1 16C1 14.8954 1.8954 14 3 14L7 14L7 10C7 8.8954 7.8954 8 9 8L13 8L13 4C13 2.8954 13.8954 2 15 2L20 2C21.6569 2 23 3.3431 23 5L23 19C23 20.6569 21.6569 22 20 22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 19V16C2 15.4477 2.4477 15 3 15H7C7.5523 15 8 14.5523 8 14V10C8 9.4477 8.4477 9 9 9H13C13.5523 9 14 8.5523 14 8V4C14 3.4477 14.4477 3 15 3H20C21.1046 3 22 3.8954 22 5V19C22 20.1046 21.1046 21 20 21H4C2.8954 21 2 20.1046 2 19Z"/>
    </svg>
  )
}
