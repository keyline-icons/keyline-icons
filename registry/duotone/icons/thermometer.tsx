import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Thermometer({ size = 24, ...props }: IconProps) {
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
      <path d="M16.1716 2.1716C16.9217 1.4214 17.9391 1 19 1C21.2091 1 23 2.7909 23 5C23 6.0609 22.5786 7.0783 21.8284 7.8284L10.4852 19.1716C9.7351 19.9218 8.7177 20.3432 7.6568 20.3432C5.4477 20.3432 3.6568 18.5523 3.6568 16.3432C3.6568 15.2823 4.0782 14.2649 4.8284 13.5148L16.1716 2.1716Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.5355 18.4645L2 22M16.1716 3.5858L17.5858 5M13.3431 6.4142L14.7574 7.8284M10.5147 9.2426L11.9289 10.6569"/>
    </svg>
  )
}
