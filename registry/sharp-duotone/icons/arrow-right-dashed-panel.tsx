import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowRightDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M3 7L3 3L7 3M9.5 3L14.5 3M21 8L21 3.0001L17 3M8 21L3 21L3 17M3 9.5L3 14.5" strokeOpacity="0.4"/>
      <path d="M9 15.5L20.5249 15.5M14.6906 9.7045L20.7601 15.5L14.7102 21.2768"/>
    </svg>
  )
}
