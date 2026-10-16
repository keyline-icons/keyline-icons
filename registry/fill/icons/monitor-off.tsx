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
      <path d="M17 17H5C2.79086 17 1 15.20914 1 13V7C1 5.4283 1.9213 4 3.3542 3.3542ZM9.6569 3H19C21.2091 3 23 4.7909 23 7V13C23 14.1736 22.4846 15.2879 21.5904 16.0479C21.1935 16.3853 20.604 16.3614 20.2357 15.9931L8.9497 4.7071C8.6637 4.4211 8.5782 3.991 8.733 3.6173C8.8878 3.2436 9.2524 3 9.6569 3Z" fill="currentColor" stroke="none"/>
      <path d="M12 16V20M8 20H16M2 2L22 22"/>
    </svg>
  )
}
