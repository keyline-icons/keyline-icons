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
      <path d="M10 2L22 2L22 22L10 22L10 2ZM10 22L2 22L2 6L10 6M14 5L14 9M14 11L14 15M18 5L18 9M18 11L18 15M6 9L6 13M6 15L6 19M14 22L14 18L18 18L18 22" fill="none"/>
    </svg>
  )
}
