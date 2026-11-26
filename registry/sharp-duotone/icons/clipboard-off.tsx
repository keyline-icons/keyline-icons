import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClipboardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21 21.12V22C21 22.5523 20.552 23 20 23H4C3.448 23 3 22.5523 3 22V4C3 3.7544 3.088 3.5295 3.235 3.3554L21 21.12ZM6 2.3431V2C6 1.4477 6.448 1 7 1H17C17.552 1 18 1.4477 18 2V3H20C20.552 3 21 3.4477 21 4V17.3431L9.657 6H16V3H8V4.3431L6 2.3431Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.707 1.7071L22.293 22.2929"/>
    </svg>
  )
}
