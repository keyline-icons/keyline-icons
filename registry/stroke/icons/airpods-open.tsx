import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AirpodsOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9L21 9C21.5523 9 22 9.4477 22 10L22 16C22 18.7614 19.7614 21 17 21L7 21C4.2386 21 2 18.7614 2 16L2 10C2 9.4477 2.4477 9 3 9ZM3.7961 9C1.9535 6.6308 3.461 3.4056 6.7609 3L17.2391 3C20.539 3.4056 22.0465 6.6308 20.2039 9M8 9C8 9.5523 8.4477 10 9 10L15 10C15.5523 10 16 9.5523 16 9" fill="none"/>
      <path d="M13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
