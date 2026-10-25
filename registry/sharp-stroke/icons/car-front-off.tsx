import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20 20L17.5 20L17 18L7 18L6.5 20L3 20L3 10L10 10M5.0513 10L5.3518 9L6.4482 6.4482M5.3518 9L2.5 9M8 12.5L8 15.5M14.6569 10L21 10L21 16.3431M8.6569 4L16.5 4L18.6482 9L18.9487 10M18.6482 9L21.5 9M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
