import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ElectricKettle({ size = 24, ...props }: IconProps) {
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
      <path d="M7.5 5.5H5C3.8954 5.5 3 6.4 3 7.5V9.41C3 10.14 3.0388 10.88 3.3833 11.52C3.8221 12.33 4.6422 13.23 6 13.5M16.5 5.5H19.9955C20.7545 5.5 21.2368 6.31 20.8734 6.98L18.5 11M11 9V13M6 21H19M18 17H6.9592C6.4231 17 5.9813 16.58 5.9784 16.04C5.955 11.61 6.8978 3 12 3C16.7762 3 18.8149 8.93 18.9879 16C19.0014 16.55 18.5523 17 18 17Z"/>
    </svg>
  )
}
