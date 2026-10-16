import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Airplay({ size = 24, ...props }: IconProps) {
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
      <path d="M12.8 12.4L18.8 20.4C18.9298 20.5731 19 20.7836 19 21C19 21.5523 18.5523 22 18 22L6 22C5.4477 22 5 21.5523 5 21C5 20.7836 5.0702 20.5731 5.2 20.4L11.2 12.4C11.3889 12.1482 11.6852 12 12 12C12.3148 12 12.6111 12.1482 12.8 12.4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.1043 16L2 16L2 3L22 3L22 16L19.8957 16L18.8957 16M12 13L18 21L6 21L12 13Z"/>
    </svg>
  )
}
