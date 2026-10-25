import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MountainSnow({ size = 24, ...props }: IconProps) {
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
      <path d="M2 20L7 10L9.5 13L14.0349 4L22 20ZM10.481 11.0531C10.9498 10.8292 12.2136 10.0874 13.5 10.5C15.835 11.249 16.1204 10.1424 16.8571 9.6692" fill="none"/>
    </svg>
  )
}
