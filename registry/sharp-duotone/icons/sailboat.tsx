import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sailboat({ size = 24, ...props }: IconProps) {
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
      <path d="M11 4.5858L11 2C11 1.4477 11.4477 1 12 1C12.3038 1 12.5911 1.1381 12.7809 1.3753L20.7809 11.3753C20.9227 11.5526 21 11.7729 21 12C21 12.5523 20.5523 13 20 13L5 13C4.4477 13 4 12.5523 4 12C4 11.7348 4.1054 11.4804 4.2929 11.2929L11 4.5858Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 15L22 15C22.5523 15 23 15.4477 23 16C23 16.1974 22.9416 16.3904 22.8321 16.5547L18.8321 22.5547C18.6466 22.8329 18.3344 23 18 23L6 23C5.6656 23 5.3534 22.8329 5.1679 22.5547L1.1679 16.5547C1.0584 16.3904 1 16.1974 1 16C1 15.4477 1.4477 15 2 15Z" fill="currentColor" stroke="none"/>
      <path d="M12 4L12 16" fill="none"/>
    </svg>
  )
}
