import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowUTurnLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L21 3L21 21L3 21L3 3Z"/>
      <path d="M10.8937 16.5L12.9203 16.5C14.6212 16.5 16 15.1569 16 13.5C16 11.8431 14.6212 10.5 12.9203 10.5L8.0833 10.5M11.1625 7.1909L8 10.5L11.1625 13.8091"/>
    </svg>
  )
}
