import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MonitorOff({ size = 24, ...props }: IconProps) {
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
      <path d="M16 16H5C3.34315 16 2 14.65685 2 13V7C2 5.67855 2.8644 4.5126 4.129 4.129M9.6569 4H19C20.6569 4 22 5.3431 22 7V13C22 13.8802 21.6135 14.7159 20.9428 15.2859M12 16V20M8 20H16M2 2L22 22"/>
    </svg>
  )
}
