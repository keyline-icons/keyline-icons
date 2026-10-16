import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BatteryLow({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5H15C17.20914 5 19 6.79086 19 9V15C19 17.20914 17.20914 19 15 19H5C2.79086 19 1 17.20914 1 15V9C1 6.79086 2.79086 5 5 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 6H15C16.65685 6 18 7.34315 18 9V15C18 16.65685 16.65685 18 15 18H5C3.34315 18 2 16.65685 2 15V9C2 7.34315 3.34315 6 5 6ZM22 9.5V14.5M6 10V14"/>
    </svg>
  )
}
