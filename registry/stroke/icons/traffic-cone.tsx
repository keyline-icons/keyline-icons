import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrafficCone({ size = 24, ...props }: IconProps) {
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
      <path d="M4 22L9.5724 3.4253C9.8262 2.5793 10.6048 2 11.4881 2L12.5119 2C13.3952 2 14.1738 2.5793 14.4276 3.4253L20 22M2 22L22 22M8 8.6667L16 8.6667M6 15.3333L18 15.3333" fill="none"/>
    </svg>
  )
}
