import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeyboardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.646 20.6465C20.129 20.8803 19.568 21.0008 19 21H5C2.791 21 1 19.2091 1 17V7C1 5.4276 1.921 4.0009 3.353 3.3535L20.646 20.6465ZM9.657 3H19C21.209 3 23 4.7909 23 7V16.3431H22.98C22.98 16.8844 22.542 17.3233 22 17.3233C21.74 17.3233 21.491 17.22 21.307 17.0361L21.293 17.0503L8.95 4.7071L8.964 4.6929C8.78 4.5092 8.677 4.2598 8.677 3.9998C8.677 3.4585 9.116 3.0198 9.657 3.02V3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.5 11H6.5C6.776 11 7 11.2239 7 11.5V12.5C7 12.7761 6.776 13 6.5 13H5.5C5.224 13 5 12.7761 5 12.5V11.5C5 11.2239 5.224 11 5.5 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19.872 19.8715C19.596 19.9551 19.303 20 19 20H5C3.343 20 2 18.6569 2 17V7C2 5.6462 2.897 4.5019 4.128 4.1285M8 16H16M2 2L22 22"/>
    </svg>
  )
}
