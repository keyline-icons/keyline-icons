import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ToggleOn({ size = 24, ...props }: IconProps) {
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
      <path d="M19 12C19 13.6568 17.6568 15 16 15C14.3432 15 13 13.6568 13 12C13 10.3432 14.3432 9 16 9C17.6568 9 19 10.3432 19 12Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M8 5H16C19.866 5 23 8.13401 23 12C23 15.866 19.866 19 16 19H8C4.13401 19 1 15.866 1 12C1 8.13401 4.13401 5 8 5ZM19 12C19 13.6568 17.6568 15 16 15C14.3432 15 13 13.6568 13 12C13 10.3432 14.3432 9 16 9C17.6568 9 19 10.3432 19 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
