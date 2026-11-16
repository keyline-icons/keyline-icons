import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sink({ size = 24, ...props }: IconProps) {
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
      <path d="M22 13C22.5523 13 23 13.448 23 14C23 14.552 22.5523 15 22 15H21V19C21 21.209 19.2092 23 17 23H7C4.7908 23 3 21.209 3 19V15H2C1.4477 15 1 14.552 1 14C1 13.448 1.4477 13 2 13H22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 14V5C12 3.343 13.3431 2 15 2C16.6569 2 18 3.343 18 5V6M16 14V11C16 10.448 16.4477 10 17 10H20M8 14V11C8 10.448 7.5523 10 7 10H4"/>
    </svg>
  )
}
