import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquarePercent({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6C3 4.3431 4.3431 3 6 3L18 3C19.6569 3 21 4.3431 21 6L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 6Z"/>
      <path d="M8.5 7C9.3285 7 10 7.6716 10 8.5C10 9.3285 9.3285 10 8.5 10C7.6716 10 7 9.3285 7 8.5C7 7.6716 7.6716 7 8.5 7ZM15.5 14C16.3285 14 17 14.6716 17 15.5C17 16.3285 16.3285 17 15.5 17C14.6716 17 14 16.3285 14 15.5C14 14.6716 14.6716 14 15.5 14Z" fill="currentColor" stroke="none"/>
      <path d="M8 16L16 8"/>
    </svg>
  )
}
