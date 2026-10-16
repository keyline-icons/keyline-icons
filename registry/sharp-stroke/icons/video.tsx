import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Video({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12L16 12L16 21L2 21L2 12ZM16 15L22 12L22 21L16 18M8 5.5C8 6.8807 6.8807 8 5.5 8C4.1193 8 3 6.8807 3 5.5C3 4.1193 4.1193 3 5.5 3C6.8807 3 8 4.1193 8 5.5ZM17 5.5C17 6.8807 15.8807 8 14.5 8C13.1193 8 12 6.8807 12 5.5C12 4.1193 13.1193 3 14.5 3C15.8807 3 17 4.1193 17 5.5Z"/>
    </svg>
  )
}
