import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HousePlay({ size = 24, ...props }: IconProps) {
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
      <path d="M11.454 2.15C11.796 1.97 12.296 1.96 12.61 2.2L20.628 8.37L23 10.38L21.707 11.91L21 11.31V21C21 21.55 20.552 22 20 22H4C3.448 22 3 21.55 3 21V11.31L2.293 11.91L1 10.38L3.372 8.37L11.454 2.15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22.352 11.15L19.998 9.15L11.998 3L3.998 9.15L1.645 11.15M3.998 9.15V21H19.998V9.15M9.498 9.28L15.874 13.5L9.498 17.72V9.28Z"/>
    </svg>
  )
}
