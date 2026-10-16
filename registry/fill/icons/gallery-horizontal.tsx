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
      <path d="M9 2L15 2C16.65685 2 18 3.34315 18 5L18 19C18 20.65685 16.65685 22 15 22L9 22C7.34315 22 6 20.65685 6 19L6 5C6 3.34315 7.34315 2 9 2Z" fill="currentColor" stroke="none"/>
      <path d="M3 3V21M21 3V21"/>
    </svg>
  )
}
