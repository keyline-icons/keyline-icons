import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlayPause({ size = 24, ...props }: IconProps) {
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
      <path d="M2.5145 5.1425L12.5145 11.1425C12.8157 11.3232 13 11.6487 13 12C13 12.3513 12.8157 12.6768 12.5145 12.8575L2.5145 18.8575C2.3591 18.9507 2.1812 19 2 19C1.4477 19 1 18.5523 1 18L1 6C1 5.4477 1.4477 5 2 5C2.1812 5 2.3591 5.0493 2.5145 5.1425Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17 5L17 19M22 5L22 19" fill="none"/>
    </svg>
  )
}
