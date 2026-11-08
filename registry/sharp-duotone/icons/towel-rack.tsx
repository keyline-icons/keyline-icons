import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TowelRack({ size = 24, ...props }: IconProps) {
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
      <path d="M20 2C20.552 2 21 2.45 21 3V6H23V8H21V21C21 21.55 20.552 22 20 22H9C8.448 22 8 21.55 8 21V16H4C3.448 16 3 15.55 3 15V8H1V6H3V5.5C3 3.57 4.567 2 6.5 2H20Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M21 18V21C21 21.55 20.552 22 20 22H9C8.448 22 8 21.55 8 21V18H21ZM20 2C20.552 2 21 2.45 21 3V6H23V8H21V16H8V8H1V6H8V2H20Z" fill="currentColor"/>
    </svg>
  )
}
