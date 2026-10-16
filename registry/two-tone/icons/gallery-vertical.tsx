import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M5 6L19 6C20.65685 6 22 7.34315 22 9L22 15C22 16.65685 20.65685 18 19 18L5 18C3.34315 18 2 16.65685 2 15L2 9C2 7.34315 3.34315 6 5 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 7L19 7C20.10457 7 21 7.89543 21 9L21 15C21 16.10457 20.10457 17 19 17L5 17C3.89543 17 3 16.10457 3 15L3 9C3 7.89543 3.89543 7 5 7ZM3 3H21M3 21H21"/>
    </svg>
  )
}
