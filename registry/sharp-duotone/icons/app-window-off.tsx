import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AppWindowOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.645 21.7646C21.47 21.9115 21.246 22 21 22H3C2.448 22 2 21.5523 2 21V3C2 2.7544 2.088 2.5295 2.235 2.3554L21.645 21.7646ZM5.657 2H21C21.552 2 22 2.4477 22 3V18.3431L5.657 2ZM16 7C16 6.4477 15.552 6 15 6C14.448 6 14 6.4477 14 7C14 7.5523 14.448 8 15 8C15.552 8 16 7.5523 16 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.707 1.7071L22.293 22.293"/>
    </svg>
  )
}
