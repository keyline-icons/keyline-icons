import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Building({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2L20 2L20 22L4 22L4 2ZM10 22L10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20L14 22M9 5L9 9M15 5L15 9M9 11L9 15M15 11L15 15"/>
    </svg>
  )
}
