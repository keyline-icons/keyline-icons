import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Volume({ size = 24, ...props }: IconProps) {
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
      <path d="M2 9L6 9L11 4L11 20L6 15L2 15L2 9ZM15.0772 6.2227L15.8044 6.9091C17.2058 8.2316 18 10.0732 18 12C18 13.9268 17.2058 15.7684 15.8044 17.0909L15.0772 17.7773M18.2608 3.7273L18.5498 4C20.7519 6.0782 22 8.9721 22 12C22 15.0279 20.7519 17.9218 18.5498 20L18.2608 20.2727"/>
    </svg>
  )
}
