import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Soup({ size = 24, ...props }: IconProps) {
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
      <path d="M2 11L22 11C22.5523 11 23 11.4477 23 12C23 12.0738 22.9918 12.1475 22.9756 12.2195C21.8206 17.3529 17.2617 21 12 21C6.7383 21 2.1794 17.3529 1.0244 12.2195C1.0082 12.1475 1 12.0738 1 12C1 11.4477 1.4477 11 2 11Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 20L19 20M5 8C5 7.2131 5.3705 6.4721 6 6C6.6295 5.5279 7 4.7869 7 4M11 8C11 7.2131 11.3705 6.4721 12 6C12.6295 5.5279 13 4.7869 13 4M17 8C17 7.2131 17.3705 6.4721 18 6C18.6295 5.5279 19 4.7869 19 4"/>
    </svg>
  )
}
