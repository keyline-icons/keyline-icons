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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8.119 5.5H3V9.41C3 10.14 3.039 10.88 3.383 11.52C3.822 12.33 4.642 13.23 6 13.5L6.067 13.51M16.428 5.49L20.996 5.93L18.5 11M11 8V14M5 21H20M18 17H6.96C6.424 17 5.982 16.58 5.979 16.04C5.955 11.61 6.898 3 12 3C16.777 3 18.815 8.93 18.988 16C19.002 16.55 18.553 17 18 17Z"/>
    </svg>
  )
}
