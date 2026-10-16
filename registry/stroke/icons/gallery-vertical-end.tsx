import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryVerticalEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M5 11L19 11C20.10457 11 21 11.89543 21 13L21 19C21 20.10457 20.10457 21 19 21L5 21C3.89543 21 3 20.10457 3 19L3 13C3 11.89543 3.89543 11 5 11ZM5 7H19M7 3H17"/>
    </svg>
  )
}
