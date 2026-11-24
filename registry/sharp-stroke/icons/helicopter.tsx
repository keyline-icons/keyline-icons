import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Helicopter({ size = 24, ...props }: IconProps) {
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
      <path d="M6 6L7 6L21 6L22 6M14 6L14 10M21.5207 14L16.5207 14L15.5207 14M7 10L19.2112 10L22 14.8303L22 18L11.6189 18ZM2 10L7 10M2 6L2 7L2 13L2 14" fill="none"/>
    </svg>
  )
}
