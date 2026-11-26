import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EarbudsOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11 11V19C11 20.657 9.657 22 8 22C6.343 22 5 20.657 5 19V11.899C2.672 11.424 0.999 9.376 0.999 7C0.999 5.426 1.741 3.944 3 3L11 11ZM19 19C19 20.657 17.657 22 16 22C14.343 22 13 20.657 13 19V13L19 19ZM13 8.343V7C13 4.238 15.239 2 18 2C20.761 2 23 4.238 23 7C23 9.376 21.328 11.424 19 11.899V12.343H18.98C18.98 12.884 18.541 13.323 18 13.323C17.74 13.323 17.491 13.22 17.307 13.036L17.293 13.05L13.293 9.05L13.307 9.036C13.123 8.852 13.02 8.603 13.02 8.343H13ZM6.249 2.006C8.815 2.134 10.866 4.185 10.994 6.751L6.249 2.006Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3.716 3.716C2.679 4.439 2 5.64 2 7C2 8.901 3.338 10.539 5.2 10.919C5.666 11.014 6 11.424 6 11.899V19C6 20.105 6.895 21 8 21C9.105 21 10 20.105 10 19V10M14 14V19C14 20.105 14.895 21 16 21C17.105 21 18 20.105 18 19V18M6 17H10M14 17H17M2 2L22 22"/>
    </svg>
  )
}
