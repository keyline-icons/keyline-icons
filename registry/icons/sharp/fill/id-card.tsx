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
      <path d="M2 3L22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 4C1 3.4477 1.4477 3 2 3ZM12 10C12 8.3431 10.6569 7 9 7C7.3431 7 6 8.3431 6 10C6 11.6569 7.3431 13 9 13C10.6569 13 12 11.6569 12 10ZM4.101 19L13.899 19C13.4238 16.672 11.376 15 9 15C6.624 15 4.5762 16.672 4.101 19ZM14 9L14 11L19 11L19 9L14 9ZM14 13L14 15L19 15L19 13L14 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
