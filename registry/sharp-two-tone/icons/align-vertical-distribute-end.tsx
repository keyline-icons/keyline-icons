import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M16 13C16.552 13 17 13.448 17 14V19H23V21H1V19H7V14C7 13.448 7.448 13 8 13H16ZM20 3C20.552 3 21 3.448 21 4V9H23V11H1V9H3V4C3 3.448 3.448 3 4 3H20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M23 20H1M23 10H1M16 14V20H8V14H16ZM20 10H4V4H20V10Z"/>
    </svg>
  )
}
