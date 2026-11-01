import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Breakfast({ size = 24, ...props }: IconProps) {
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
      <path d="M6 12L6 11C6 10.4477 6.4477 10 7 10L17 10C17.5523 10 18 10.4477 18 11L18 19C18 20.6569 16.6569 22 15 22L13 22M18 13L19 13C20.6569 13 22 14.3431 22 16C22 17.6569 20.6569 19 19 19L18 19M10.5 6C10.5 5.2131 10.8705 4.4721 11.5 4C12.1295 3.5279 12.5 2.7869 12.5 2M15.5 6C15.5 5.2131 15.8705 4.4721 16.5 4C17.1295 3.5279 17.5 2.7869 17.5 2M8 16L8.54545 16C11.5579 16 14 18.4421 14 21.4545C14 21.7558 13.7558 22 13.4545 22L2.54545 22C2.24421 22 2 21.7558 2 21.4545C2 18.4421 4.44208 16 7.45455 16ZM8 16L8 22" fill="none"/>
    </svg>
  )
}
