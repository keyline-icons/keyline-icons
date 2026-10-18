import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LibraryBig({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4C2 3.4477 2.4477 3 3 3L6 3C6.5523 3 7 3.4477 7 4L7 20C7 20.5523 6.5523 21 6 21L3 21C2.4477 21 2 20.5523 2 20L2 4ZM7 4C7 3.4477 7.4477 3 8 3L11 3C11.5523 3 12 3.4477 12 4L12 20C12 20.5523 11.5523 21 11 21L8 21C7.4477 21 7 20.5523 7 20L7 4ZM12.0543 5.2999C12.0183 5.1953 12 5.0855 12 4.9749C12 4.5479 12.2712 4.1679 12.675 4.0292L15.5122 3.0543C15.6168 3.0183 15.7266 3 15.8372 3C16.2642 3 16.6441 3.2712 16.7829 3.675L21.9457 18.7001C21.9817 18.8047 22 18.9145 22 19.0251C22 19.4521 21.7288 19.8321 21.325 19.9708L18.4878 20.9457C18.3832 20.9817 18.2734 21 18.1628 21C17.7358 21 17.3559 20.7288 17.2171 20.325L12.0543 5.2999Z" fill="none"/>
    </svg>
  )
}
