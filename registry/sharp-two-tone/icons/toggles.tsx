import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Toggles({ size = 24, ...props }: IconProps) {
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
      <path d="M4.5 1L19.5 1C20.3284 1 21 1.6716 21 2.5L21 9.5C21 10.3284 20.3284 11 19.5 11L4.5 11C3.6716 11 3 10.3284 3 9.5L3 2.5C3 1.6716 3.6716 1 4.5 1ZM4.5 13L19.5 13C20.3284 13 21 13.6716 21 14.5L21 21.5C21 22.3284 20.3284 23 19.5 23L4.5 23C3.6716 23 3 22.3284 3 21.5L3 14.5C3 13.6716 3.6716 13 4.5 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.5 2L19.5 2C19.7761 2 20 2.2239 20 2.5L20 9.5C20 9.7761 19.7761 10 19.5 10L4.5 10C4.2239 10 4 9.7761 4 9.5L4 2.5C4 2.2239 4.2239 2 4.5 2ZM4.5 14L19.5 14C19.7761 14 20 14.2239 20 14.5L20 21.5C20 21.7761 19.7761 22 19.5 22L4.5 22C4.2239 22 4 21.7761 4 21.5L4 14.5C4 14.2239 4.2239 14 4.5 14ZM12 2L12 10M12 14L12 22"/>
    </svg>
  )
}
