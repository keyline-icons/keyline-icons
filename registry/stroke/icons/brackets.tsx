import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Brackets({ size = 24, ...props }: IconProps) {
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
      <path d="M8 2L6 2C4.8954 2 4 2.8954 4 4L4 20C4 21.1046 4.8954 22 6 22L8 22M16 2L18 2C19.1046 2 20 2.8954 20 4L20 20C20 21.1046 19.1046 22 18 22L16 22" fill="none"/>
    </svg>
  )
}
