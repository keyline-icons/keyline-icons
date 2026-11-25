import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ZodiacScorpio({ size = 24, ...props }: IconProps) {
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
      <path d="M2 16L2 6C2 4.3431 3.3431 3 5 3C6.6569 3 8 4.3431 8 6L8 16M8 6C8 4.3431 9.3431 3 11 3C12.6569 3 14 4.3431 14 6L14 14C14 15.6569 15.3431 17 17 17L22 17M17.7071 12.7071L22 17L17.7071 21.2929" fill="none"/>
    </svg>
  )
}
