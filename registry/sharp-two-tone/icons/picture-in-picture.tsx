import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PictureInPicture({ size = 24, ...props }: IconProps) {
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
      <path d="M12 11L22 11C22.5523 11 23 11.4477 23 12L23 20C23 20.5523 22.5523 21 22 21L12 21C11.4477 21 11 20.5523 11 20L11 12C11 11.4477 11.4477 11 12 11Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 9L22 4L2 4L2 20L9 20M12 12L22 12L22 20L12 20L12 12Z"/>
    </svg>
  )
}
