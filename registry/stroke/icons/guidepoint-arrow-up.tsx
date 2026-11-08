import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M16 17C16 15.34 17.3432 14 19 14C20.6568 14 22 15.34 22 17C22 18.66 20.6568 20 19 20C17.3432 20 16 18.66 16 17ZM16 17H8M8 17C8 18.66 6.6568 20 5 20C3.3432 20 2 18.66 2 17C2 15.34 3.3432 14 5 14C6.6568 14 8 15.34 8 17ZM8.0732 9.25L11.5228 4.25C11.7338 3.92 12.2662 3.92 12.4772 4.25L15.9268 9.25C16.1361 9.58 15.8716 10 15.4496 10H8.5504C8.1284 10 7.8639 9.58 8.0732 9.25Z"/>
    </svg>
  )
}
