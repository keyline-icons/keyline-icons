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
      <path d="M21 21L12 21C11.4477 21 11 20.5523 11 20L11 12C11 11.7238 11.1119 11.4738 11.2929 11.2929ZM14.6569 11L22 11C22.5523 11 23 11.4477 23 12L23 19.3431Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M22 9L22 4L9.6569 4L8.6569 4M4 4L2 4L2 20L9 20M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
