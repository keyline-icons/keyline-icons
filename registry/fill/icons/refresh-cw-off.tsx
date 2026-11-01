import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RefreshCwOff({ size = 24, ...props }: IconProps) {
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
      <path d="M3.2117 13.9407C3.071 13.3034 3 12.6527 3 12C3 9.5147 4.0074 7.2647 5.636 5.636M18.364 18.364C16.7353 19.9926 14.4853 21 12 21C9.5169 21 7.1441 19.9741 5.4432 18.1651M4.2857 21L4.7293 17.895C4.7683 17.6216 5.0216 17.4317 5.295 17.4707L8.4 17.9143M9.1256 3.4688C10.0282 3.1648 10.9949 3 12 3C14.4831 3 16.8559 4.0259 18.5568 5.8349M19.7143 3L19.2707 6.105C19.2317 6.3784 18.9784 6.5683 18.705 6.5293L15.6 6.0857M20.7883 10.0593C20.929 10.6966 21 11.3473 21 12C21 13.0051 20.8352 13.9718 20.5312 14.8744M2 2L22 22" fill="none"/>
    </svg>
  )
}
