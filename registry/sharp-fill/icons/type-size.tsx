import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TypeSize({ size = 24, ...props }: IconProps) {
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
      <path d="M2 8L2 7L2 4L16 4L16 7L16 8M9 4L9 20M5 20L6 20L12 20L13 20M13 14L13 13L13 11L22 11L22 13L22 14M17.5 11L17.5 20M15 20L16 20L19 20L20 20"/>
    </svg>
  )
}
