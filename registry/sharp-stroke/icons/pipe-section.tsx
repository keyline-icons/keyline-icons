import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PipeSection({ size = 24, ...props }: IconProps) {
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
      <path d="M20 1L20 2L20 10C20 15.5228 15.5228 20 10 20L2 20L1 20M13 1L13 2L13 10C13 11.6569 11.6569 13 10 13L2 13L1 13M6 23L6 22L6 11L6 10M23 6L22 6L11 6L10 6" fill="none"/>
    </svg>
  )
}
