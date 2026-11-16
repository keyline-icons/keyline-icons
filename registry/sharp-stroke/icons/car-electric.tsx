import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarElectric({ size = 24, ...props }: IconProps) {
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
      <path d="M5.352 9L5 10.1707L3 10.8775V20H6.5L7 18H17L17.5 20H21V10.8775L19 10.1707L18.648 9M5.352 9L7.5 4H16.5L18.648 9M5.352 9H2.5M18.648 9H21.5M13.293 7.7071L10 11H14L10.707 14.2929"/>
    </svg>
  )
}
