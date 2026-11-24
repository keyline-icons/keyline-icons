import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bikini({ size = 24, ...props }: IconProps) {
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
      <path d="M7 1L7 2L7 6.7639L12 9M7 6.7639C6.3637 7.333 6 8.1463 6 9C6 10.6568 7.3431 12 9 12C10.6568 12 12 10.6568 12 9C12 10.6568 13.3432 12 15 12C16.6569 12 18 10.6568 18 9C18 8.1463 17.6363 7.333 17 6.7639L12 9M17 6.7639L17 2L17 1M7 17L17 17L17 18.5L13.5 22L10.5 22L7 18.5Z" fill="none"/>
    </svg>
  )
}
