import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryHorizontalStart({ size = 24, ...props }: IconProps) {
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
      <path d="M5 2L11 2C12.65685 2 14 3.34315 14 5L14 19C14 20.65685 12.65685 22 11 22L5 22C3.34315 22 2 20.65685 2 19L2 5C2 3.34315 3.34315 2 5 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 3L11 3C12.10457 3 13 3.89543 13 5L13 19C13 20.10457 12.10457 21 11 21L5 21C3.89543 21 3 20.10457 3 19L3 5C3 3.89543 3.89543 3 5 3ZM17 5V19M21 7V17"/>
    </svg>
  )
}
