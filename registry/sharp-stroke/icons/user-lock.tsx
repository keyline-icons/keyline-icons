import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserLock({ size = 24, ...props }: IconProps) {
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
      <path d="M9 3C10.6569 3 12 4.3431 12 6C12 7.6569 10.6569 9 9 9C7.3432 9 6 7.6569 6 6C6 4.3431 7.3432 3 9 3ZM12 21L2 21L2 19C2 15.6863 4.6863 13 8 13L12 13M15 16L22 16L22 21L15 21ZM16.5 16L16.5 14C16.5 12.8954 17.3954 12 18.5 12C19.6046 12 20.5 12.8954 20.5 14L20.5 16"/>
    </svg>
  )
}
