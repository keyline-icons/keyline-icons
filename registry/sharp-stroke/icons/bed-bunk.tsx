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
      <path d="M3 5L9 5L9 9M3 13L9 13L9 17M16 13L21 13M3 22L3 17L3 15L3 13L3 9L3 7L3 5L3 2M21 9L16 9L9 9L3 9M21 17L16 17L9 17L3 17M16 22L16 21L16 20L16 17L16 13L16 9M21 2L21 5L21 9L21 13L21 17L21 22" fill="none"/>
    </svg>
  )
}
