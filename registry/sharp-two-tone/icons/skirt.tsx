import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Skirt({ size = 24, ...props }: IconProps) {
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
      <path d="M5 7.838L5 4C5 3.4477 5.4477 3 6 3L12 3L18 3C18.5523 3 19 3.4477 19 4L19 7.838L22.9462 19.684C22.9802 19.7859 22.9975 19.8926 22.9975 20C22.9975 20.5523 22.5498 21 21.9975 21L12 21L2.0025 21C1.4502 21 1.0025 20.5523 1.0025 20C1.0025 19.8926 1.0198 19.7859 1.0538 19.684Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 8L18 4L6 4L6 8M15.6667 20L14 8M8.3333 20L10 8M6 8L2.0025 20L8.3333 20L15.6667 20L21.9975 20L18 8M6 8L10 8L14 8L18 8"/>
    </svg>
  )
}
