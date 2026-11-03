import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2Hd({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L22 3L22 17L2 17ZM12 17L12 21M7 21L17 21M6 6L6 14M10 6L10 14M6 10L10 10M14 7L15 7C16.7 7 18 8.3 18 10C18 11.7 16.7 13 15 13L14 13Z" fill="none"/>
    </svg>
  )
}
