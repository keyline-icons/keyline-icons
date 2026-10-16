import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowDownUp3({ size = 24, ...props }: IconProps) {
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
      <path d="M7 10L7 11L7 21.2604L7 21.9144M12.3005 16.8112L12 17.1053L7 22L2 17.1053L1.6995 16.8112M17 14L17 13L17 2.7396L17 2.0856M11.6995 7.1888L12 6.8947L17 2L22 6.8947L22.3005 7.1888" fill="none"/>
    </svg>
  )
}
