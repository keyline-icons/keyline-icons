import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.3919 20.3919C19.5438 21.9458 17.895 23 16 23H8C5.2386 23 3 20.76 3 18V6C3 5.1336 3.2204 4.3186 3.6081 3.6081L20.3919 20.3919Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7.6703 2.01C7.779 2 7.889 2 8 2L14 2L20 8L20 14.3431M20 8L17 8C15.34 8 14 6.6569 14 5L14 2" strokeOpacity="0.4"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
