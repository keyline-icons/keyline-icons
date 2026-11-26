import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PianoOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20 20L2 20L2 4L4 4M8.6569 4L22 4L22 17.3431M6 6L6 13L10 13L10 10M8 13L8 20M14 4L14 9.3431M18 4L18 13L17.6569 13M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
