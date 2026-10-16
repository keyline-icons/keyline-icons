import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartLine({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L3 19C3 20.1046 3.8954 21 5 21L21 21M7 17L8.7747 12.5633C8.9132 12.2171 9.2327 11.9767 9.6037 11.9396L18.3556 11.0644C18.7477 11.0252 19.0802 10.7594 19.2048 10.3856L21 5" fill="none"/>
    </svg>
  )
}
