import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Subtitles({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 4C1 3.4477 1.4477 3 2 3ZM5 11L9 11L9 9L5 9L5 11ZM11 11L19 11L19 9L11 9L11 11ZM5 15L13 15L13 13L5 13L5 15ZM15 15L19 15L19 13L15 13L15 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
