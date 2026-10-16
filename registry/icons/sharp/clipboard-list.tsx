import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClipboardList({ size = 24, ...props }: IconProps) {
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
      <path d="M7 4L4 4L4 22L20 22L20 4L17 4M7 2L17 2L17 7L7 7L7 2ZM11 13L17 13M11 17L17 17" fill="none"/>
      <path d="M9 13C9 13.5523 8.5523 14 8 14C7.4477 14 7 13.5523 7 13C7 12.4477 7.4477 12 8 12C8.5523 12 9 12.4477 9 13ZM9 17C9 17.5523 8.5523 18 8 18C7.4477 18 7 17.5523 7 17C7 16.4477 7.4477 16 8 16C8.5523 16 9 16.4477 9 17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
