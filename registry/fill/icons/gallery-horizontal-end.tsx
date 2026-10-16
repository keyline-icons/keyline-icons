import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryHorizontalEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M13 2L19 2C20.65685 2 22 3.34315 22 5L22 19C22 20.65685 20.65685 22 19 22L13 22C11.34315 22 10 20.65685 10 19L10 5C10 3.34315 11.34315 2 13 2Z" fill="currentColor" stroke="none"/>
      <path d="M7 5V19M3 7V17"/>
    </svg>
  )
}
