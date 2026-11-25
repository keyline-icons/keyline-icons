import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartForecast({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L3 19C3 20.1046 3.8954 21 5 21L21 21M7 17L13 11"/>
      <path d="M17 8C17 8.5523 16.5523 9 16 9C15.4477 9 15 8.5523 15 8C15 7.4477 15.4477 7 16 7C16.5523 7 17 7.4477 17 8ZM20 5C20 5.5523 19.5523 6 19 6C18.4477 6 18 5.5523 18 5C18 4.4477 18.4477 4 19 4C19.5523 4 20 4.4477 20 5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
