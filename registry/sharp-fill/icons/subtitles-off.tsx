import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SubtitlesOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21 21L2 21C1.4477 21 1 20.5523 1 20L1 4C1 3.4477 1.4477 3 2 3L3 3L9 9L5 9L5 11L10 11L10 10L13 13L5 13L5 15L14 15L14 14ZM6.6569 3L22 3C22.5523 3 23 3.4477 23 4L23 19.3431Z" fill="currentColor" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
