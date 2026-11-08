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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M22 1C22.5523 1 23 1.448 23 2V22C23 22.552 22.5523 23 22 23C21.4477 23 21 22.552 21 22V2C21 1.448 21.4477 1 22 1ZM16 13C17.6569 13 19 14.343 19 16V18C19 19.657 17.6569 21 16 21H4C2.3432 21 1 19.657 1 18V16C1 14.343 2.3432 13 4 13H16ZM16 3C17.6569 3 19 4.343 19 6V8C19 9.657 17.6569 11 16 11H12C10.3431 11 9 9.657 9 8V6C9 4.343 10.3431 3 12 3H16Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 2V22M18 6V8C18 9.105 17.1046 10 16 10H12C10.8954 10 10 9.105 10 8V6C10 4.895 10.8954 4 12 4H16C17.1046 4 18 4.895 18 6ZM18 16V18C18 19.105 17.1046 20 16 20H4C2.8954 20 2 19.105 2 18V16C2 14.895 2.8954 14 4 14H16C17.1046 14 18 14.895 18 16Z"/>
    </svg>
  )
}
