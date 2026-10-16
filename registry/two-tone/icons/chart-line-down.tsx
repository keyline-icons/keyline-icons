import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartLineDown({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L3 19C3 20.1046 3.8954 21 5 21L21 21" strokeOpacity="0.4"/>
      <path d="M7 8L10.3887 11.8123C10.7342 12.201 11.32 12.26 11.7361 11.9479L14.3361 9.998C14.721 9.7092 15.2571 9.7356 15.6118 10.0608L20.2628 14.3243M16.5 15L20.5 15C20.7761 15 21 14.7761 21 14.5L21 10.5"/>
    </svg>
  )
}
