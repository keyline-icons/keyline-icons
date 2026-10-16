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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.3951 3.512L1.3976 17.5119C1.1387 17.9651 1.0025 18.4781 1.0025 19C1.0025 20.6569 2.3457 22 4.0025 22L19.9975 22C21.6543 22 22.9975 20.6569 22.9975 19C22.9975 18.4781 22.8613 17.9651 22.6024 17.5119L14.6049 3.512C14.0709 2.577 13.0767 2 12 2C10.9233 2 9.9291 2.577 9.3951 3.512Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7.4117 9L16.5883 9M3.9842 15L20.0158 15"/>
    </svg>
  )
}
