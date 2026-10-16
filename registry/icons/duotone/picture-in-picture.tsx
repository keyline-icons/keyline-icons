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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14 11L20 11C21.65685 11 23 12.34315 23 14L23 18C23 19.65685 21.65685 21 20 21L14 21C12.34315 21 11 19.65685 11 18L11 14C11 12.34315 12.34315 11 14 11Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 8L22 7C22 5.3431 20.6569 4 19 4L5 4C3.3432 4 2 5.3431 2 7L2 17C2 18.6569 3.3432 20 5 20L8 20"/>
    </svg>
  )
}
