import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function History({ size = 24, ...props }: IconProps) {
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
      <path d="M3.2117 10.0593C3.071 10.6966 3 11.3473 3 12C3 16.9706 7.0294 21 12 21C16.9706 21 21 16.9706 21 12C21 7.0294 16.9706 3 12 3C9.5169 3 7.1441 4.0259 5.4432 5.8349M4.2857 3L4.7293 6.105C4.7683 6.3784 5.0216 6.5683 5.295 6.5293L8.4 6.0857M12 8L12 12L16 12" fill="none"/>
    </svg>
  )
}
