import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Podium({ size = 24, ...props }: IconProps) {
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
      <path d="M20 5.75C20.5523 5.75 21 6.19772 21 6.75V17.25C21 17.8023 20.5523 18.25 20 18.25H4C3.44772 18.25 3 17.8023 3 17.25V13.75C3 13.1977 3.44772 12.75 4 12.75H8V10.25C8 9.69772 8.44772 9.25 9 9.25H13V6.75C13 6.19772 13.4477 5.75 14 5.75H20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 17.25H23"/>
    </svg>
  )
}
