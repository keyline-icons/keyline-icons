import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Skirt({ size = 24, ...props }: IconProps) {
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
      <path d="M18 8L18 4L6 4L6 8M15.6667 20L14 8M8.3333 20L10 8M6 8L2.0025 20L8.3333 20L15.6667 20L21.9975 20L18 8M6 8L10 8L14 8L18 8" fill="none"/>
    </svg>
  )
}
