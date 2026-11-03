import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor22k({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L22 3L22 17L2 17ZM12 17L12 21M7 21L17 21M6 8.3C6.3 7.5 7 7 8 7C9.2 7 10 7.7 10 8.7C10 9.6 9.4 10.2 8.6 10.8L6 13L10.5 13M14 6L14 14M18 7L14 10.8M15.2 9.66L18 13" fill="none"/>
    </svg>
  )
}
