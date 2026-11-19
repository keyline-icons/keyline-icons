import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Teacher({ size = 24, ...props }: IconProps) {
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
      <path d="M9 6.5917L9 2L22 2L22 15L12.1235 15M12 6.5L19 6.5M13 10.5L19 10.5" strokeOpacity="0.4"/>
      <path d="M10.5 12C10.5 13.933 8.933 15.5 7 15.5C5.067 15.5 3.5 13.933 3.5 12C3.5 10.067 5.067 8.5 7 8.5C8.933 8.5 10.5 10.067 10.5 12ZM1 21.5C1 19.2909 2.7909 17.5 5 17.5L9 17.5C11.2091 17.5 13 19.2909 13 21.5L13 22C13 22.5523 12.5523 23 12 23L2 23C1.4477 23 1 22.5523 1 22Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
