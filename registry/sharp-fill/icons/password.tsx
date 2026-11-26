import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Password({ size = 24, ...props }: IconProps) {
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
      <path d="M4 6L4 13M1.6 11.3L6.4 7.7M1.6 7.7L6.4 11.3M12 6L12 13M9.6 11.3L14.4 7.7M9.6 7.7L14.4 11.3M20 6L20 13M17.6 11.3L22.4 7.7M17.6 7.7L22.4 11.3M1 17L23 17"/>
    </svg>
  )
}
