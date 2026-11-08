import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignEndVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M22 1C22.552 1 23 1.448 23 2V22C23 22.552 22.552 23 22 23C21.448 23 21 22.552 21 22V2C21 1.448 21.448 1 22 1ZM16 13C17.6569 13 19 14.343 19 16V18C19 19.657 17.6569 21 16 21H4C2.3432 21 1 19.657 1 18V16C1 14.343 2.3432 13 4 13H16Z" fill="currentColor"/>
      <path d="M16 3C17.6569 3 19 4.343 19 6V8C19 9.657 17.6569 11 16 11H12C10.3431 11 9 9.657 9 8V6C9 4.343 10.3431 3 12 3H16Z" fill="currentColor"/>
    </svg>
  )
}
