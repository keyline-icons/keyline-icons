import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowLeftRight3({ size = 24, ...props }: IconProps) {
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
      <path d="M10 17L11 17L21.2604 17L21.9144 17M16.8112 11.6995L17.1053 12L22 17L17.1053 22L16.8112 22.3005M14 7L13 7L2.7396 7L2.0856 7M7.1888 12.3005L6.8947 12L2 7L6.8947 2L7.1888 1.6995" fill="none"/>
    </svg>
  )
}
