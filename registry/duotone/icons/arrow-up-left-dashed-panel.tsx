import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpLeftDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5 21L13.5 21M21 13.5L21 10.5M3 17L3 18C3 19.6569 4.3431 21 6 21M18 21C19.6569 21 21 19.6569 21 18M17 3L18 3C19.6569 3 21 4.3431 21 6" strokeOpacity="0.4"/>
      <path d="M12.5 12.5L3.5 3.5M3 12.5L3 3.5C3 3.2239 3.2239 3 3.5 3L12.5 3"/>
    </svg>
  )
}
