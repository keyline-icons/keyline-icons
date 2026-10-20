import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2ArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M5 3L19 3C20.6569 3 22 4.3431 22 6L22 14C22 15.6569 20.6569 17 19 17L5 17C3.3431 17 2 15.6569 2 14L2 6C2 4.3431 3.3431 3 5 3ZM12 17L12 21M8 21L16 21M12 13L12 7M9 10L12 7L15 10" fill="none"/>
    </svg>
  )
}
