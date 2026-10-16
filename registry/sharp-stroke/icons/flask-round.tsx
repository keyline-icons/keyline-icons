import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskRound({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 2L14.5 2L14.5 8.4617C17.2101 9.4979 19 12.0986 19 15C19 18.866 15.866 22 12 22C8.134 22 5 18.866 5 15C5 12.0986 6.7899 9.4979 9.5 8.4617L9.5 2ZM7 2L17 2M5.0718 16L18.9282 16" fill="none"/>
    </svg>
  )
}
