import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileOff({ size = 24, ...props }: IconProps) {
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
      <path d="M16 23H4C3.4477 23 3 22.5523 3 22V3L21 21V22C21 22.5523 20.5523 23 20 23H16Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 15.34L20 8L14 2L6.5 2M14 2L14 8L20 8" strokeOpacity="0.4"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
