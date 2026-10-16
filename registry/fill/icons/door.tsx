import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Door({ size = 24, ...props }: IconProps) {
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
      <path d="M5 22L5 4C5 2.8954 5.8954 2 7 2L17 2C18.1046 2 19 2.8954 19 4L19 22L5 22ZM15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11L13 13C13 13.5523 13.4477 14 14 14C14.5523 14 15 13.5523 15 13L15 11Z" fill="currentColor" stroke="none"/>
      <path d="M2 21L22 21" fill="none"/>
    </svg>
  )
}
