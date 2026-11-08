import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Scale3d({ size = 24, ...props }: IconProps) {
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
      <path d="M12 9.98L15 7.95V4.91L12 3L9 4.91V7.95L12 9.98ZM12 9.98L12 13.01M16 16.05L19 14.02L22 16.05V19.08L19 21L16 19.09V16.05ZM16 16.05L12 13.01M8 16.05L5 14.02L2 16.05V19.09L5 21L8 19.08V16.05ZM8 16.05L12 13.01"/>
    </svg>
  )
}
