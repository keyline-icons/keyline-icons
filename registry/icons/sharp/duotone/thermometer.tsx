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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16.1716 2.1716C16.9217 1.4214 17.9391 1 19 1C21.2091 1 23 2.7909 23 5C23 6.0609 22.5786 7.0783 21.8284 7.8284L10.4852 19.1716C9.7351 19.9218 8.7177 20.3432 7.6568 20.3432C5.4477 20.3432 3.6568 18.5523 3.6568 16.3432C3.6568 15.2823 4.0782 14.2649 4.8284 13.5148L16.1716 2.1716Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.5355 18.4645L2 22L1.7071 22.2929M15.4645 2.8787L17.8787 5.2929M12.636 5.7071L15.0503 8.1213M9.8076 8.5355L12.2218 10.9497"/>
    </svg>
  )
}
