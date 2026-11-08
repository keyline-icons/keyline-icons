import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HotTea({ size = 24, ...props }: IconProps) {
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
      <path d="M16 13V11C16 10.45 15.5523 10 15 10H10M16 13V19M16 13H17C18.6569 13 20 14.34 20 16C20 17.66 18.6569 19 17 19H16M10 10H5C4.4477 10 4 10.45 4 11V19C4 20.66 5.3431 22 7 22H13C14.6569 22 16 20.66 16 19M10 10V14M8.5 6C8.5 5.21 8.8705 4.47 9.5 4C10.1295 3.53 10.5 2.79 10.5 2M13.5 6C13.5 5.21 13.8705 4.47 14.5 4C15.1295 3.53 15.5 2.79 15.5 2M10 14H8.5C8.2239 14 8 14.22 8 14.5V17.5C8 17.78 8.2239 18 8.5 18H11.5C11.7761 18 12 17.78 12 17.5V14.5C12 14.22 11.7761 14 11.5 14H10Z"/>
    </svg>
  )
}
