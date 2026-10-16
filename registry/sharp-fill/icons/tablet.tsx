import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tablet({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M23 20C23 20.5523 22.5523 21 22 21L2 21C1.44772 21 1 20.5523 1 20L1 4C1 3.44772 1.44772 3 2 3L22 3C22.5523 3 23 3.44772 23 4L23 20ZM13.5 8.5C13.5 7.6716 12.8284 7 12 7C11.1716 7 10.5 7.6716 10.5 8.5C10.5 9.3284 11.1716 10 12 10C12.8284 10 13.5 9.3284 13.5 8.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
