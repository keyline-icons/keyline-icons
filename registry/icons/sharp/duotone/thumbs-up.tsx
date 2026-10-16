import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ThumbsUp({ size = 24, ...props }: IconProps) {
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
      <path d="M2 9L7.2192 9L9.0299 1.7575C9.1411 1.3123 9.5411 1 10 1L15 1C15.5043 1 15.9297 1.3755 15.9923 1.876L16.8828 9L22 9C22.5523 9 23 9.4477 23 10C23 10.1199 22.9784 10.2388 22.9363 10.3511L18.4363 22.3511C18.29 22.7414 17.9168 23 17.5 23L2 23C1.4477 23 1 22.5523 1 22L1 10C1 9.4477 1.4477 9 2 9ZM3 11L3 21L7 21L7 11L3 11Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M3 11L3 21L7 21L7 11L3 11Z" fill="currentColor"/>
    </svg>
  )
}
