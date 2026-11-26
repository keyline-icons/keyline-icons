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
      <path d="M21.5858 23L13 23C12.4477 23 12 22.5523 12 22L12 12L22.2929 22.2929ZM12.702 9.0451C12.7961 9.0158 12.8962 9 13 9L22 9C22.5523 9 23 9.4477 23 10L23 19.3431Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M4 14L4 4M6.6569 2L7.6569 2L20 2L20 5M10 18L2 18L2 14L10 14M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
