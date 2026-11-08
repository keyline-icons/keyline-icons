import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointArrowDown({ size = 24, ...props }: IconProps) {
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
      <path d="M16 7C16 8.66 17.3432 10 19 10C20.6568 10 22 8.66 22 7C22 5.34 20.6568 4 19 4C17.3432 4 16 5.34 16 7ZM16 7H8M8 7C8 5.34 6.6568 4 5 4C3.3432 4 2 5.34 2 7C2 8.66 3.3432 10 5 10C6.6568 10 8 8.66 8 7ZM8.0732 14.75L11.5228 19.75C11.7338 20.08 12.2662 20.08 12.4772 19.75L15.9268 14.75C16.1361 14.42 15.8716 14 15.4496 14H8.5504C8.1284 14 7.8639 14.42 8.0732 14.75Z"/>
    </svg>
  )
}
