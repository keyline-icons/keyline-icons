import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowOutUpRightOff({ size = 24, ...props }: IconProps) {
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
      <path d="M7 7L3 7L3 21L17 21L17 17M14.1213 9.8787L14.8284 9.1716L20.8536 3.1464M12 3L21 3L21 12" strokeOpacity="0.4"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
