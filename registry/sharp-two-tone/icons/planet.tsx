import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Planet({ size = 24, ...props }: IconProps) {
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
      <path d="M20 12C20 16.4183 16.4183 20 12 20C7.5817 20 4 16.4183 4 12C4 7.5817 7.5817 4 12 4C16.4183 4 20 7.5817 20 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 12C19 15.866 15.866 19 12 19C8.134 19 5 15.866 5 12C5 8.134 8.134 5 12 5C15.866 5 19 8.134 19 12ZM5.0002 12.0505C2.8253 13.4478 1.7403 14.762 2.0528 15.6205C2.6195 17.1774 7.5324 16.8186 13.0261 14.8191C18.5198 12.8195 22.5139 9.9364 21.9472 8.3795C21.6347 7.521 19.9589 7.2117 17.3946 7.5393" fill="none"/>
    </svg>
  )
}
