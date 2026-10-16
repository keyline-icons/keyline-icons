import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowRightLeft3({ size = 24, ...props }: IconProps) {
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
      <path d="M14 17L13 17L2.7396 17L2.0856 17M7.1888 11.6995L6.8947 12L2 17L6.8947 22L7.1888 22.3005M10 7L11 7L21.2604 7L21.9144 7M16.8112 12.3005L17.1053 12L22 7L17.1053 2L16.8112 1.6995" fill="none"/>
    </svg>
  )
}
