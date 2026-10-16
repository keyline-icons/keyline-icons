import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DiagramSuccessor({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L11 3C11.5523 3 12 3.4477 12 4L12 7C12 7.5523 11.5523 8 11 8L4 8C3.4477 8 3 7.5523 3 7L3 4C3 3.4477 3.4477 3 4 3ZM4 16L20 16C20.5523 16 21 16.4477 21 17L21 20C21 20.5523 20.5523 21 20 21L4 21C3.4477 21 3 20.5523 3 20L3 17C3 16.4477 3.4477 16 4 16ZM12 5.5L17 5.5C17.5523 5.5 18 5.9477 18 6.5L18 12M20 10L18 12L16 10" fill="none"/>
    </svg>
  )
}
