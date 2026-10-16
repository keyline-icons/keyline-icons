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
      <path d="M22 8V7C22 5.34315 20.65685 4 19 4H5C3.34315 4 2 5.34315 2 7V17C2 18.65685 3.34315 20 5 20H8M14 12L20 12C21.10457 12 22 12.89543 22 14L22 18C22 19.10457 21.10457 20 20 20L14 20C12.89543 20 12 19.10457 12 18L12 14C12 12.89543 12.89543 12 14 12Z"/>
    </svg>
  )
}
