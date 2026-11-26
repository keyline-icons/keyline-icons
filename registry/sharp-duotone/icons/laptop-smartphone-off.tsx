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
      <path d="M22.233 22.353L21.586 23H13C12.448 23 12 22.552 12 22V12.12L22.233 22.353ZM12.702 9.045C12.796 9.016 12.896 9 13 9H22C22.552 9 23 9.448 23 10V19.343L12.702 9.045Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 14V4M6.657 2H7.657H20V5M10 18H2V14H10" strokeOpacity="0.4"/>
      <path d="M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
