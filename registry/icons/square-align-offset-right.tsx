import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareAlignOffsetRight({ size = 24, ...props }: IconProps) {
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
      <path d="M21 6L21 18C21 19.6569 19.6569 21 18 21L6 21C4.34315 21 3 19.6569 3 18L3 6C3 4.34314 4.34315 3 6 3L18 3C19.6569 3 21 4.34315 21 6Z"/>
      <path d="M16 8V13M8 14V16M12 16V9"/>
    </svg>
  )
}
