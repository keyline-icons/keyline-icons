import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TypeOff({ size = 24, ...props }: IconProps) {
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
      <path d="M4 7L4 6L4 5C4 4.7065 4.0632 4.4278 4.1767 4.1767M7.6569 3L8.6569 3L20 3L20 6L20 7M12 3L12 6.3431L12 7.3431M12 21L12 12M7.6569 21L8.6569 21L15.3431 21L16.3431 21" strokeOpacity="0.4"/>
      <path d="M1.7071 1.7071L2 2L22 22L22.2929 22.2929"/>
    </svg>
  )
}
