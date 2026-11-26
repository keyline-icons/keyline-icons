import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareListPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2H21C21.552 2 22 2.448 22 3V11C22 11.552 21.552 12 21 12H12V21C12 21.552 11.552 22 11 22H3C2.448 22 2 21.552 2 21V3C2 2.448 2.448 2 3 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 21H3V3H21V12M11 8H17M18 14V22M14 18H22"/>
      <path d="M9 8C9 8.552 8.552 9 8 9C7.448 9 7 8.552 7 8C7 7.448 7.448 7 8 7C8.552 7 9 7.448 9 8ZM9 12C9 12.552 8.552 13 8 13C7.448 13 7 12.552 7 12C7 11.448 7.448 11 8 11C8.552 11 9 11.448 9 12ZM9 16C9 16.552 8.552 17 8 17C7.448 17 7 16.552 7 16C7 15.448 7.448 15 8 15C8.552 15 9 15.448 9 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
