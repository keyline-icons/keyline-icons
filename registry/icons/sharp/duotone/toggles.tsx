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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 3L11 3L11 9L5 9ZM13 15L19 15L19 21L13 21Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M4.5 1L19.5 1C20.3284 1 21 1.6716 21 2.5L21 9.5C21 10.3284 20.3284 11 19.5 11L4.5 11C3.6716 11 3 10.3284 3 9.5L3 2.5C3 1.6716 3.6716 1 4.5 1ZM4.5 13L19.5 13C20.3284 13 21 13.6716 21 14.5L21 21.5C21 22.3284 20.3284 23 19.5 23L4.5 23C3.6716 23 3 22.3284 3 21.5L3 14.5C3 13.6716 3.6716 13 4.5 13ZM5 3L5 9L11 9L11 3L5 3ZM13 15L13 21L19 21L19 15L13 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
