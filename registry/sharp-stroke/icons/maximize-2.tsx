import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Maximize2({ size = 24, ...props }: IconProps) {
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
      <path d="M3 10L3 3L10 3M9.2929 9.2929L3.1757 3.1757M21 10L21 3L14 3M14.7071 9.2929L20.8243 3.1757M21 14L21 21L14 21M14.7071 14.7071L20.8243 20.8243M3 14L3 21L10 21M9.2929 14.7071L3.1757 20.8243"/>
    </svg>
  )
}
