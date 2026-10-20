import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlagSwallowtail({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L20 3C20.5523 3 21 3.4477 21 4C21 4.1612 20.961 4.32 20.8864 4.4629L17.9949 10L20.8864 15.5371C20.961 15.68 21 15.8388 21 16C21 16.5523 20.5523 17 20 17L4 17C3.4477 17 3 16.5523 3 16L3 4C3 3.4477 3.4477 3 4 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 1L4 23M4 4L20 4L16.8668 10L20 16L4 16" fill="none"/>
    </svg>
  )
}
