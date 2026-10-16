import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Podium3({ size = 24, ...props }: IconProps) {
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
      <path d="M20 10.5C20.5523 10.5 21 10.9477 21 11.5V22C21 22.5523 20.5523 23 20 23H4C3.44772 23 3 22.5523 3 22V18.5C3 17.9477 3.44772 17.5 4 17.5H8V15C8 14.4477 8.44772 14 9 14H13V11.5C13 10.9477 13.4477 10.5 14 10.5H20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 22H23M14.3 2H18.7L16.728 4.334C18.7 4.334 18.7 4.9706 18.7 5.9254C18.7 7.4107 15.606 7.1985 15.3 6.2437L14.9948 5.2914"/>
    </svg>
  )
}
