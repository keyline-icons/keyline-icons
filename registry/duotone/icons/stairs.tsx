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
      <path d="M2 19V16C2 15.4477 2.4477 15 3 15H7C7.5523 15 8 14.5523 8 14V10C8 9.4477 8.4477 9 9 9H13C13.5523 9 14 8.5523 14 8V4C14 3.4477 14.4477 3 15 3H20C21.1046 3 22 3.8954 22 5V19C22 20.1046 21.1046 21 20 21H4C2.8954 21 2 20.1046 2 19Z"/>
    </svg>
  )
}
