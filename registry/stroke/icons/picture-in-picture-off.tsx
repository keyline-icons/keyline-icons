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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M22 8L22 7C22 5.3431 20.6569 4 19 4L9.6569 4M4.1285 4.1285C2.8967 4.5019 2 5.6462 2 7L2 17C2 18.6569 3.3432 20 5 20L8 20M17.6569 12L20 12C21.1046 12 22 12.8954 22 14L22 16.3431M20 20L14 20C12.8954 20 12 19.1046 12 18L12 14C12 13.4477 12.2239 12.9477 12.5858 12.5858M2 2L22 22"/>
    </svg>
  )
}
