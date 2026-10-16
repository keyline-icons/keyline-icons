import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableRowsRemoveAbove({ size = 24, ...props }: IconProps) {
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
      <path d="M5 4.1716C3.8014 4.5954 3 5.7287 3 7L3 13M21 13L21 7C21 5.7287 20.1986 4.5954 19 4.1716" strokeOpacity="0.4"/>
      <path d="M2 12L22 12L22 19C22 21.2091 20.2091 23 18 23L6 23C3.7909 23 2 21.2091 2 19L2 12Z" fill="currentColor" stroke="none"/>
      <path d="M9 2L15 8M15 2L9 8"/>
    </svg>
  )
}
