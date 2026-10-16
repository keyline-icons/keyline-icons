import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConical({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 1L14.5 1C15.0523 1 15.5 1.4477 15.5 2L15.5 7.8106L20.9307 21.6344C20.9765 21.7508 20.9999 21.8749 20.9999 22C20.9999 22.5523 20.5522 23 19.9999 23L4.0001 23C3.4478 23 3.0001 22.5523 3.0001 22C3.0001 21.8749 3.0235 21.7508 3.0693 21.6344L8.5 7.8106L8.5 2C8.5 1.4477 8.9477 1 9.5 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.8899 17L19.1101 17L20.9307 21.6344C20.9765 21.7508 20.9999 21.8749 20.9999 22C20.9999 22.5523 20.5522 23 19.9999 23L4.0001 23C3.4478 23 3.0001 22.5523 3.0001 22C3.0001 21.8749 3.0235 21.7508 3.0693 21.6344Z" fill="currentColor" stroke="none"/>
      <path d="M7 2L17 2"/>
    </svg>
  )
}
