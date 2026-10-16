import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartPyramid({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.1258 2.5144L1.1258 20.5144C1.0433 20.6629 1 20.8301 1 21C1 21.5523 1.4477 22 2 22L22 22C22.5523 22 23 21.5523 23 21C23 20.8301 22.9567 20.6629 22.8742 20.5144L12.8742 2.5144C12.6978 2.1969 12.3632 2 12 2C11.6368 2 11.3022 2.1969 11.1258 2.5144Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M8.0782 8L15.9218 8L17.0329 10L6.9671 10ZM4.7449 14L19.2551 14L20.3662 16L3.6338 16Z" fill="currentColor"/>
    </svg>
  )
}
