import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Coupon({ size = 24, ...props }: IconProps) {
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
      <path d="M5 4H19C20.65685 4 22 5.34315 22 7V9C20.34315 9 19 10.34315 19 12C19 13.65685 20.34315 15 22 15V17C22 18.65685 20.65685 20 19 20H5C3.34315 20 2 18.65685 2 17V15C3.65685 15 5 13.65685 5 12C5 10.34315 3.65685 9 2 9V7C2 5.34315 3.34315 4 5 4ZM9 15L15 9"/>
      <path d="M10.5 8.5C10.5 9.3284 9.8284 10 9 10C8.1716 10 7.5 9.3284 7.5 8.5C7.5 7.6716 8.1716 7 9 7C9.8284 7 10.5 7.6716 10.5 8.5ZM16.5 15.5C16.5 16.3284 15.8284 17 15 17C14.1716 17 13.5 16.3284 13.5 15.5C13.5 14.6716 14.1716 14 15 14C15.8284 14 16.5 14.6716 16.5 15.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
