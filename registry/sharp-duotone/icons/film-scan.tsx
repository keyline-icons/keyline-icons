import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FilmScan({ size = 24, ...props }: IconProps) {
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
      <path d="M14 12V21C14 21.5523 13.5523 22 13 22H3C2.4477 22 2 21.5523 2 21V3C2 2.4477 2.4477 2 3 2H13C13.5523 2 14 2.4477 14 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 6.5H7V8.5H4ZM4 11H7V13H4ZM4 15.5H7V17.5H4ZM9 4H13V11H9ZM9 13H13V20H9Z" fill="currentColor" stroke="none"/>
      <path d="M13 1V23"/>
      <path d="M17 2V11M17 22V13M21 21V17M21 15V9M21 7V3" strokeOpacity="0.4"/>
    </svg>
  )
}
