import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseCrack({ size = 24, ...props }: IconProps) {
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
      <path d="M1.6175 11.1476L2 10.8473L12 2.9975L22 10.8473L22.3825 11.1476M4 9.2808L4 21L20 21L20 9.2808M12 3L10.5 7.5L13.5 10L10.5 14L13.5 17L12 21" fill="none"/>
    </svg>
  )
}
