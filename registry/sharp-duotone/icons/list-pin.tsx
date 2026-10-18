import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListPin({ size = 24, ...props }: IconProps) {
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
      <path d="M1 10L8 10M1 15L6 15M1 20L12 20M15.5 15L15.5 21" fill="none" strokeOpacity="0.4"/>
      <path d="M11.5 3L19.5 3C20.0523 3 20.5 3.4477 20.5 4L20.5 7C20.5 7.5523 20.0523 8 19.5 8L18.5 8L18.5 9.9648L22.5547 12.6679C22.8329 12.8534 23 13.1656 23 13.5L23 15C23 15.5523 22.5523 16 22 16L9 16C8.4477 16 8 15.5523 8 15L8 13.5C8 13.1656 8.1671 12.8534 8.4453 12.6679L12.5 9.9648L12.5 8L11.5 8C10.9477 8 10.5 7.5523 10.5 7L10.5 4C10.5 3.4477 10.9477 3 11.5 3Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
