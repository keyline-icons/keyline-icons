import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageInline({ size = 24, ...props }: IconProps) {
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
      <path d="M10 9L14 9C14.5523 9 15 9.4477 15 10L15 14C15 14.5523 14.5523 15 14 15L10 15C9.4477 15 9 14.5523 9 14L9 10C9 9.4477 9.4477 9 10 9ZM3 3H21M3 21H21M3 12H5M19 12H21"/>
    </svg>
  )
}
