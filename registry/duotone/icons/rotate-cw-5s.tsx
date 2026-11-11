import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCw5s({ size = 24, ...props }: IconProps) {
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
      <path d="M20.7883 10.0593C20.929 10.6966 21 11.3473 21 12C21 16.9706 16.9706 21 12 21C7.0294 21 3 16.9706 3 12C3 7.0294 7.0294 3 12 3C14.4831 3 16.8559 4.0259 18.5568 5.8349M19.7143 3L19.2707 6.105C19.2317 6.3784 18.9784 6.5683 18.705 6.5293L15.6 6.0857" strokeOpacity="0.4"/>
      <path d="M13.75 9.5L10.55 9.5L10.25 12.2L12.1 12.2C13.0113 12.2 13.75 12.9387 13.75 13.85C13.75 14.7613 13.0113 15.5 12.1 15.5L11.75 15.5C11.35 15.5 11 15.4 10.7 15.15"/>
    </svg>
  )
}
