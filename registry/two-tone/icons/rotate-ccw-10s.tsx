import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCcw10s({ size = 24, ...props }: IconProps) {
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
      <path d="M3.2117 10.0593C3.071 10.6966 3 11.3473 3 12C3 16.9706 7.0294 21 12 21C16.9706 21 21 16.9706 21 12C21 7.0294 16.9706 3 12 3C9.5169 3 7.1441 4.0259 5.4432 5.8349M4.2857 3L4.7293 6.105C4.7683 6.3784 5.0216 6.5683 5.295 6.5293L8.4 6.0857" strokeOpacity="0.4"/>
      <path d="M7.25 11.1L9.25 9.5L9.25 15.5M13.25 11.25C13.25 10.2835 14.0335 9.5 15 9.5C15.9665 9.5 16.75 10.2835 16.75 11.25L16.75 13.75C16.75 14.7165 15.9665 15.5 15 15.5C14.0335 15.5 13.25 14.7165 13.25 13.75Z"/>
    </svg>
  )
}
