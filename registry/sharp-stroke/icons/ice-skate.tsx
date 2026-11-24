import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IceSkate({ size = 24, ...props }: IconProps) {
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
      <path d="M11 4L4 6L4 17L19 17L19 14.5135C19 13.5617 18.5671 12.6418 17.7886 12.0941C16.4131 11.1263 14.3296 10 11 10L11 2L11 1M7 17L7 22M14 17L14 22M2 22L19 22C20.1046 22 21 21.1046 21 20L21 19" fill="none"/>
    </svg>
  )
}
