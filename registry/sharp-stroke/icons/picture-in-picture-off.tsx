import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PictureInPictureOff({ size = 24, ...props }: IconProps) {
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
      <path d="M22 9L22 4L9.6569 4L8.6569 4M4 4L2 4L2 20L9 20M16.6569 12L17.6569 12L22 12L22 16.3431L22 17.3431M20 20L12 20L12 12M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
