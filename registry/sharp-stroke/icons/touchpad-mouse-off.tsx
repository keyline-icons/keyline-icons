import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TouchpadMouseOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11 16L2 16L2 2.4142M6.6569 2L20 2L20 7M15.2403 10.9356L16.1235 10.4666C16.6831 10.1688 17.3218 10 18 10C20.2091 10 22 11.7909 22 14L22 17.3431M20.8284 20.8284C20.1046 21.5523 19.1046 22 18 22C15.7909 22 14 20.2091 14 18L14 14M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
