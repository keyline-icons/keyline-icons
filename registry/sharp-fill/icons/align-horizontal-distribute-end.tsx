import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalDistributeEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M11 1V23H9V17H4C3.448 17 3 16.552 3 16V8C3 7.448 3.448 7 4 7H9V1H11ZM21 1V23H19V21H14C13.448 21 13 20.552 13 20V4C13 3.448 13.448 3 14 3H19V1H21Z" fill="currentColor"/>
    </svg>
  )
}
