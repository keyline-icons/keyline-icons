import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Move3d({ size = 24, ...props }: IconProps) {
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
      <path d="M7.619 16.28L11.998 13M11.998 13L16.377 16.28M11.998 13V9.49M7.96 9.49L11.998 3L16.036 9.49H7.96ZM19.132 13.53L20.996 21L13.527 19.13L19.132 13.53ZM4.865 13.53L3 21L10.469 19.13L4.865 13.53Z"/>
    </svg>
  )
}
