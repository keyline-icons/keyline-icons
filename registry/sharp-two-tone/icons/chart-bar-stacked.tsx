import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartBarStacked({ size = 24, ...props }: IconProps) {
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
      <path d="M7 4L16 4C16.5523 4 17 4.4477 17 5L17 9C17 9.5523 16.5523 10 16 10L7 10C6.4477 10 6 9.5523 6 9L6 5C6 4.4477 6.4477 4 7 4ZM7 12L19 12C19.5523 12 20 12.4477 20 13L20 17C20 17.5523 19.5523 18 19 18L7 18C6.4477 18 6 17.5523 6 17L6 13C6 12.4477 6.4477 12 7 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 2L3 21L22 21" strokeOpacity="0.4"/>
      <path d="M7 5L16 5L16 9L7 9L7 5ZM7 13L19 13L19 17L7 17L7 13ZM12 5L12 9M14 13L14 17"/>
    </svg>
  )
}
