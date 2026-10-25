import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarFront({ size = 24, ...props }: IconProps) {
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
      <path d="M3 10L21 10L21 20L17.5 20L17 18L7 18L6.5 20L3 20ZM5.0513 10L5.35177 9L7.5 4L16.5 4L18.6482 9L18.9487 10M5.35177 9L2.5 9M18.6482 9L21.5 9M8 12.5L8 15.5M16 12.5L16 15.5" fill="none"/>
    </svg>
  )
}
