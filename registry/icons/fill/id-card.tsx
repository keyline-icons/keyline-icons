import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IdCard({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 3L19 3C21.2091 3 23 4.7909 23 7L23 17C23 19.2091 21.2091 21 19 21L5 21C2.7909 21 1 19.2091 1 17L1 7C1 4.7909 2.7909 3 5 3ZM12 10C12 8.3431 10.6569 7 9 7C7.3431 7 6 8.3431 6 10C6 11.6569 7.3431 13 9 13C10.6569 13 12 11.6569 12 10ZM4.101 19L13.899 19C13.4238 16.672 11.376 15 9 15C6.624 15 4.5762 16.672 4.101 19ZM15 9C14.4477 9 14 9.4477 14 10C14 10.5523 14.4477 11 15 11L18 11C18.5523 11 19 10.5523 19 10C19 9.4477 18.5523 9 18 9L15 9ZM15 13C14.4477 13 14 13.4477 14 14C14 14.5523 14.4477 15 15 15L18 15C18.5523 15 19 14.5523 19 14C19 13.4477 18.5523 13 18 13L15 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
