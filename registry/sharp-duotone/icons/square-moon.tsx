import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareMoon({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2H21C21.552 2 22 2.4477 22 3V21C22 21.5523 21.552 22 21 22H3C2.448 22 2 21.5523 2 21V3C2 2.4477 2.448 2 3 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17 12C17 14.7614 14.761 17 12 17C9.239 17 7 14.7614 7 12C7 9.2386 9.239 7 12 7C10.868 8.4154 10.981 10.4559 12.262 11.7376C13.544 13.0193 15.585 13.1323 17 12Z"/>
    </svg>
  )
}
