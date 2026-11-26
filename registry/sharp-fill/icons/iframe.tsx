import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Iframe({ size = 24, ...props }: IconProps) {
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
      <path d="M21 3V9H3V3H21ZM12 12H17C17.552 12 18 12.448 18 13V17C18 17.552 17.552 18 17 18H7C6.448 18 6 17.552 6 17V13C6 12.448 6.448 12 7 12H12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 9H21M3 3H21V21H3V3ZM7 13H17V17H7V13Z"/>
    </svg>
  )
}
