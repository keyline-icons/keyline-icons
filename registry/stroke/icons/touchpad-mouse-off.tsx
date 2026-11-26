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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10 16L5 16C3.3431 16 2 14.6569 2 13L2 5C2 4.1715 2.3358 3.4215 2.8787 2.8787M7.6569 2L17 2C18.6569 2 20 3.3431 20 5L20 6M16.1235 10.4666C16.6831 10.1688 17.3218 10 18 10C20.2091 10 22 11.7909 22 14L22 16.3431M20.8284 20.8284C20.1046 21.5523 19.1046 22 18 22C15.7909 22 14 20.2091 14 18L14 14M2 2L22 22"/>
    </svg>
  )
}
