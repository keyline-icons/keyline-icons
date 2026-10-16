import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sliders2Vertical({ size = 24, ...props }: IconProps) {
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
      <path d="M4 9C4 7.3431 5.3431 6 7 6C8.6569 6 10 7.3431 10 9L10 11C10 12.6569 8.6569 14 7 14C5.3431 14 4 12.6569 4 11L4 9ZM14 13C14 11.3431 15.3431 10 17 10C18.6569 10 20 11.3431 20 13L20 15C20 16.6569 18.6569 18 17 18C15.3431 18 14 16.6569 14 15L14 13ZM7 3V6M7 14V21M17 3V10M17 18V21"/>
    </svg>
  )
}
