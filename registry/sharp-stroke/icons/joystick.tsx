import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Joystick({ size = 24, ...props }: IconProps) {
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
      <path d="M14.781 9.74C15.154 9.91 15.566 10 16 10C17.657 10 19 8.66 19 7C19 5.34 17.657 4 16 4C14.343 4 13 5.34 13 7C13 8.22 13.732 9.27 14.781 9.74ZM14.781 9.74L12.889 14M3 14H21V20H3V14Z"/>
    </svg>
  )
}
