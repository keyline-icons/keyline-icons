import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CloudSleet({ size = 24, ...props }: IconProps) {
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
      <path d="M4.5 16.753L4 16.464C2.762 15.75 2 14.429 2 13C2 10.791 3.791 9 6 9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9C20.209 9 22 10.791 22 13C22 14.429 21.238 15.75 20 16.464L19.5 16.753" strokeOpacity="0.4"/>
      <path d="M13 19C13 19.552 12.552 20 12 20C11.448 20 11 19.552 11 19C11 18.448 11.448 18 12 18C12.552 18 13 18.448 13 19Z" fill="currentColor" stroke="none"/>
      <path d="M8 16V22M16 16V22"/>
    </svg>
  )
}
