import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Moped({ size = 24, ...props }: IconProps) {
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
      <path d="M1 16H12.441C12.739 16 12.974 15.74 12.994 15.44C13.112 13.7 14.391 10.34 18.388 10.02C18.703 10 18.942 9.71 18.88 9.4L18 5H14M3 16V10H10V13V16M11 6H5M4 16V16.5C4 17.88 5.119 19 6.5 19C7.881 19 9 17.88 9 16.5V16M19.5 19C18.119 19 17 17.88 17 16.5C17 15.12 18.119 14 19.5 14C20.881 14 22 15.12 22 16.5C22 17.88 20.881 19 19.5 19Z"/>
    </svg>
  )
}
