import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Parallelogram({ size = 24, ...props }: IconProps) {
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
      <path d="M21.0103 12.238L19.0503 20.238C18.9407 20.6854 18.5396 21 18.079 21L2.001 21C1.4487 21 1.001 20.5523 1.001 20C1.001 19.9198 1.0106 19.8399 1.0297 19.762L4.9497 3.762C5.0593 3.3146 5.4604 3 5.921 3L21.999 3C22.5513 3 22.999 3.4477 22.999 4C22.999 4.0802 22.9894 4.1601 22.9703 4.238Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.921 4L21.999 4L18.079 20L2.001 20Z"/>
    </svg>
  )
}
