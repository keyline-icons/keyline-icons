import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HardHat({ size = 24, ...props }: IconProps) {
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
      <path d="M4 17L2 17L2 21L22 21L22 17L20 17M4 17L4 13C4 9.2723 6.5495 6.1401 10 5.252M4 17L10 17M20 17L20 13C20 9.2723 17.4505 6.1401 14 5.252M20 17L14 17M10 17L14 17M10 17L10 5.252M14 17L14 5.252M10 5.252L10 3L14 3L14 5.252"/>
    </svg>
  )
}
