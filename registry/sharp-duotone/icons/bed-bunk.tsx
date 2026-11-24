import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BedBunk({ size = 24, ...props }: IconProps) {
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
      <path d="M6 4L3 4C2.4477 4 2 4.4477 2 5L2 9C2 9.5523 2.4477 10 3 10L9 10C9.5523 10 10 9.5523 10 9L10 5C10 4.4477 9.5523 4 9 4ZM6 12L3 12C2.4477 12 2 12.4477 2 13L2 17C2 17.5523 2.4477 18 3 18L9 18C9.5523 18 10 17.5523 10 17L10 13C10 12.4477 9.5523 12 9 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 13L21 13M3 22L3 17L3 15L3 13L3 9L3 7L3 5L3 2M21 9L16 9L9 9L3 9M21 17L16 17L9 17L3 17M16 22L16 21L16 20L16 17L16 13L16 9M21 2L21 5L21 9L21 13L21 17L21 22"/>
    </svg>
  )
}
