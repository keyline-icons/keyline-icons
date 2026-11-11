import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCcw60s({ size = 24, ...props }: IconProps) {
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
      <path d="M3.4273 9.0828L3.2117 10.0593C3.071 10.6966 3 11.3473 3 12C3 16.9706 7.0294 21 12 21C16.9706 21 21 16.9706 21 12C21 7.0294 16.9706 3 12 3C9.5169 3 7.1441 4.0259 5.4432 5.8349L4.9867 6.3204M4.1631 2.1414L4.7999 6.5999L9.2586 5.9631M9.4 9.8C9 9.6 8.65 9.5 8.25 9.5C7.15 9.5 6.5 10.5 6.5 11.7L6.5 13.75M6.5 13.75C6.5 12.7835 7.2835 12 8.25 12C9.2165 12 10 12.7835 10 13.75C10 14.7165 9.2165 15.5 8.25 15.5C7.2835 15.5 6.5 14.7165 6.5 13.75ZM14 11.25C14 10.2835 14.7835 9.5 15.75 9.5C16.7165 9.5 17.5 10.2835 17.5 11.25L17.5 13.75C17.5 14.7165 16.7165 15.5 15.75 15.5C14.7835 15.5 14 14.7165 14 13.75Z"/>
    </svg>
  )
}
