import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryThumbnails({ size = 24, ...props }: IconProps) {
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
      <path d="M2 5C2 3.3431 3.3431 2 5 2L19 2C20.6569 2 22 3.3431 22 5L22 15C22 16.6569 20.6569 18 19 18L5 18C3.3431 18 2 16.6569 2 15L2 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 5C3 3.8954 3.8954 3 5 3L19 3C20.1046 3 21 3.8954 21 5L21 15C21 16.1046 20.1046 17 19 17L5 17C3.8954 17 3 16.1046 3 15L3 5ZM3 21L6 21M10.5 21L13.5 21M18 21L21 21" fill="none"/>
    </svg>
  )
}
