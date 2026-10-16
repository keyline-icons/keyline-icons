import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Buildings({ size = 24, ...props }: IconProps) {
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
      <path d="M2 5L9 5L9 2C9 1.4477 9.4477 1 10 1L22 1C22.5523 1 23 1.4477 23 2L23 22C23 22.5523 22.5523 23 22 23L2 23C1.4477 23 1 22.5523 1 22L1 6C1 5.4477 1.4477 5 2 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14 5L14 9M14 11L14 15M18 5L18 9M18 11L18 15M6 9L6 13M6 15L6 19M14 23L14 18L18 18L18 23"/>
    </svg>
  )
}
