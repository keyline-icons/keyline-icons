import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConicalOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.4754 20.4754L20.9307 21.6344C20.9765 21.7508 20.9999 21.8749 20.9999 22C20.9999 22.5523 20.5522 23 19.9999 23L4.0001 23C3.4478 23 3.0001 22.5523 3.0001 22C3.0001 21.8749 3.0235 21.7508 3.0693 21.6344L8.3056 8.3056ZM9.8483 9.8483L7.0387 17L16.9613 17L16.9362 16.9362ZM8.5 4.2574L8.5 2C8.5 1.4477 8.9477 1 9.5 1L14.5 1C15.0523 1 15.5 1.4477 15.5 2L15.5 7.8106L17.7302 13.4876ZM14.191 9.9484L13.5692 8.3656C13.5235 8.2492 13.5 8.1251 13.5 8L13.5 3L10.5 3L10.5 6.2574Z" fill="currentColor" stroke="none"/>
      <path d="M7 2L17 2M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
