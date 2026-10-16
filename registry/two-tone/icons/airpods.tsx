import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Airpods({ size = 24, ...props }: IconProps) {
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
      <path d="M7 2L17 2C20.3137 2 23 4.6863 23 8L23 16C23 19.3137 20.3137 22 17 22L7 22C3.6863 22 1 19.3137 1 16L1 8C1 4.6863 3.6863 2 7 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 3L17 3C19.7614 3 22 5.2386 22 8L22 16C22 18.7614 19.7614 21 17 21L7 21C4.2386 21 2 18.7614 2 16L2 8C2 5.2386 4.2386 3 7 3ZM2 9L22 9M9 8L15 8C15.5523 8 16 8.4477 16 9C16 9.5523 15.5523 10 15 10L9 10C8.4477 10 8 9.5523 8 9C8 8.4477 8.4477 8 9 8Z" fill="none"/>
      <path d="M13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
