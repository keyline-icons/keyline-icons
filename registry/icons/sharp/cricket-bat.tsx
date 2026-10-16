import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CricketBat({ size = 24, ...props }: IconProps) {
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
      <path d="M2.449 17.1565C2.05789 17.5477 1.9143 18.1543 2.04979 18.8428C2.33196 20.2769 3.72313 21.668 5.15716 21.9502C5.84574 22.0857 6.45233 21.9421 6.84347 21.551L15.6721 12.7224L15.3183 8.6818L11.2776 8.328ZM9.8217 9.7839L9.8217 14.1783L14.2161 14.1783M15.3183 8.6818L22 2L22.2929 1.7071M20.5 18.5C20.5 19.6046 19.6046 20.5 18.5 20.5C17.3954 20.5 16.5 19.6046 16.5 18.5C16.5 17.3954 17.3954 16.5 18.5 16.5C19.6046 16.5 20.5 17.3954 20.5 18.5Z" fill="none"/>
    </svg>
  )
}
