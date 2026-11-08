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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20 2C20.552 2 21 2.45 21 3V6H23V8H21V21C21 21.55 20.552 22 20 22H9C8.448 22 8 21.55 8 21V16H4C3.448 16 3 15.55 3 15V8H1V6H3V5.5C3 3.57 4.567 2 6.5 2H20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 7H9M20 7H23M9 15H4V5.5C4 4.12 5.119 3 6.5 3M9 15V13V5.5C9 4.12 7.881 3 6.5 3M9 15V17M6.5 3H20V13V17M9 17V21H20V17M9 17H20"/>
    </svg>
  )
}
