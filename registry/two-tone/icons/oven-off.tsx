import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function OvenOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.872 20.872C20.487 22.136 19.321 23 18 23H6C4.343 23 3 21.657 3 20V6C2.999 5.164 3.208 4.342 3.608 3.608L20.872 20.872ZM7.589 1.017C7.726 1.006 7.863 1 8 1H16C18.761 1 21 3.239 21 6V14.343H20.98C20.98 14.884 20.542 15.323 20 15.323C19.74 15.323 19.491 15.22 19.307 15.036L19.293 15.05L6.963 2.72L6.977 2.706C6.793 2.523 6.69 2.273 6.69 2.013C6.69 1.503 7.082 1.078 7.591 1.037L7.589 1.017Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 20C20 21.105 19.105 22 18 22H6C4.895 22 4 21.105 4 20V6C4 5.413 4.126 4.856 4.353 4.353M4 10H10M9 14H14M2 2L22 22"/>
    </svg>
  )
}
