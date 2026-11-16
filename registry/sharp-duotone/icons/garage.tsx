import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Garage({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.66 1.06C11.916 0.967 12.201 0.982 12.447 1.105L22.447 6.105C22.786 6.275 23 6.621 23 7V22C23 22.552 22.552 23 22 23H2C1.448 23 1 22.552 1 22V7C1 6.621 1.214 6.275 1.553 6.105L11.553 1.105L11.66 1.06Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M18 21H6V11H18V21ZM10 19H14V17H10V19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M22.447 6.105C22.786 6.275 23 6.621 23 7V8H1V7C1 6.621 1.214 6.275 1.553 6.105L1.764 6H22.236L22.447 6.105Z" fill="currentColor"/>
    </svg>
  )
}
