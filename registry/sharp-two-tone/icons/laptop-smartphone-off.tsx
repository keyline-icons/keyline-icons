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
      <path d="M22.293 22.293L21.586 23H13C12.448 23 12 22.552 12 22V12L22.293 22.293ZM12.702 9.045C12.796 9.016 12.896 9 13 9H22C22.552 9 23 9.448 23 10V19.343L12.702 9.045ZM6.657 1H7.657H20C20.552 1 21 1.448 21 2V5H19V3H7.657H6.657V1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 14V4M10 18H2V14H10M13 13V22H22M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
