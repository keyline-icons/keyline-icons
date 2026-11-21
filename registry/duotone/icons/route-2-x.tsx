import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Route2X({ size = 24, ...props }: IconProps) {
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
      <path d="M8.8285 16.1715C9.5513 16.8943 10 17.8957 10 19C10 21.2093 8.2093 23 6 23C3.7907 23 2 21.2093 2 19C2 16.7907 3.7907 15 6 15C7.1043 15 8.1057 15.4487 8.8285 16.1715Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 5H10.5C8.567 5 7 6.567 7 8.5C7 10.433 8.567 12 10.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9M15 2L21 8M21 2L15 8"/>
    </svg>
  )
}
