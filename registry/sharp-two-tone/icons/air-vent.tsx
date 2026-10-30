import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AirVent({ size = 24, ...props }: IconProps) {
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
      <path d="M2 2L22 2C22.5523 2 23 2.4477 23 3L23 13C23 13.5523 22.5523 14 22 14L2 14C1.4477 14 1 13.5523 1 13L1 3C1 2.4477 1.4477 2 2 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 13L22 13L22 3L2 3L2 13L6 13M5 9L19 9M14 12L14 19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19L18 17M9.5 12L9.5 17C9.5 18.1046 8.6046 19 7.5 19C6.3954 19 5.5 18.1046 5.5 17L5.5 16" fill="none"/>
    </svg>
  )
}
