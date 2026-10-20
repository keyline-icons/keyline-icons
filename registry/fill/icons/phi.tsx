import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Phi({ size = 24, ...props }: IconProps) {
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
      <path d="M6.9117 5.7195C6.3159 6.6729 6 7.7747 6 8.899C6 12.2127 8.6863 14.899 12 14.899C15.3137 14.899 18 12.2127 18 8.899C18 6.0478 15.9935 3.5904 13.2 3.0202C13.1342 3.0068 13.0672 3 13 3C12.4477 3 12 3.4477 12 4L12 21" fill="none"/>
    </svg>
  )
}
