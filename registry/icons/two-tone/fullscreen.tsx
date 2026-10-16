import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Fullscreen({ size = 24, ...props }: IconProps) {
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
      <path d="M14 3L20.5 3C20.7761 3 21 3.2239 21 3.5L21 10M14 10L20.4 3.6" strokeOpacity="0.4"/>
      <path d="M10 21L3.5 21C3.2239 21 3 20.7761 3 20.5L3 14M10 14L3.6 20.4"/>
    </svg>
  )
}
