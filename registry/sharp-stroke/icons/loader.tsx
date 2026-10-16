import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Loader({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1L12 7M15.5355 8.4645L19.7782 4.2218M17 12L23 12M15.5355 15.5355L19.7782 19.7782M12 17L12 23M8.4645 15.5355L4.2218 19.7782M1 12L7 12M8.4645 8.4645L4.2218 4.2218"/>
    </svg>
  )
}
