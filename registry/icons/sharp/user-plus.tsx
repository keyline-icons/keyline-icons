import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M19 3L19 11M15 7L23 7M8 14L10 14C13.3137 14 16 16.6863 16 20L16 21L2 21L2 20C2 16.6863 4.6863 14 8 14ZM9 4C10.6569 4 12 5.3431 12 7C12 8.6569 10.6569 10 9 10C7.3431 10 6 8.6569 6 7C6 5.3431 7.3431 4 9 4Z"/>
    </svg>
  )
}
