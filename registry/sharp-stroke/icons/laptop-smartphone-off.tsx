import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LaptopSmartphoneOff({ size = 24, ...props }: IconProps) {
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
      <path d="M4 14L4 4M6.6569 2L7.6569 2L20 2L20 5M10 18L2 18L2 14L10 14M22 17.3431L22 16.3431L22 10L15.6569 10L14.6569 10M13 13L13 22L22 22M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
