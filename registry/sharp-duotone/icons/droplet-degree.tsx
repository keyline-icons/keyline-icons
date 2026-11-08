import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DropletDegree({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9 2C9.629 2 10.222 2.3 10.6 2.8L15.4 9.2C16.439 10.58 17 12.27 17 14C17 18.42 13.418 22 9 22C4.582 22 1 18.42 1 14C1 12.27 1.561 10.58 2.6 9.2L7.4 2.8C7.778 2.3 8.371 2 9 2Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M20 2C21.657 2 23 3.34 23 5C23 6.66 21.657 8 20 8C18.343 8 17 6.66 17 5C17 3.34 18.343 2 20 2ZM20 4C19.448 4 19 4.45 19 5C19 5.55 19.448 6 20 6C20.552 6 21 5.55 21 5C21 4.45 20.552 4 20 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
