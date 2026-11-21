import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Beehouse({ size = 24, ...props }: IconProps) {
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
      <path d="M1.3714 8.2514L2 8L12 4L22 8L22.6286 8.2514M12 4L12 2L12 1M3.8779 7.2673L4 8L6 20L18 20L20 8L20.1221 7.2673M9 10L10 10L14 10L15 10M12 20L12 22L12 23" fill="none"/>
    </svg>
  )
}
