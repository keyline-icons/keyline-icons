import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M9 3L15 3C16.10457 3 17 3.89543 17 5L17 19C17 20.10457 16.10457 21 15 21L9 21C7.89543 21 7 20.10457 7 19L7 5C7 3.89543 7.89543 3 9 3ZM3 3V21M21 3V21"/>
    </svg>
  )
}
