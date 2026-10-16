import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableRowsRemoveBelow({ size = 24, ...props }: IconProps) {
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
      <path d="M5 19.8284C3.8014 19.4046 3 18.2713 3 17L3 11M21 11L21 17C21 18.2713 20.1986 19.4046 19 19.8284" strokeOpacity="0.4"/>
      <path d="M2 12L22 12L22 5C22 2.7909 20.2091 1 18 1L6 1C3.7909 1 2 2.7909 2 5L2 12Z" fill="currentColor" stroke="none"/>
      <path d="M9 16L15 22M15 16L9 22"/>
    </svg>
  )
}
