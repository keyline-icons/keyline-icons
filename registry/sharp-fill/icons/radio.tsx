import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Radio({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7L22 7C22.5523 7 23 7.4477 23 8L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 8C1 7.4477 1.4477 7 2 7ZM11 14C11 12.3431 9.6569 11 8 11C6.3431 11 5 12.3431 5 14C5 15.6569 6.3431 17 8 17C9.6569 17 11 15.6569 11 14ZM9 14C9 14.5523 8.5523 15 8 15C7.4477 15 7 14.5523 7 14C7 13.4477 7.4477 13 8 13C8.5523 13 9 13.4477 9 14ZM13 11L13 13L19 13L19 11L13 11ZM13 15L13 17L19 17L19 15L13 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M6 8L16.1788 3.9285"/>
    </svg>
  )
}
