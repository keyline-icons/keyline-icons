import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function School({ size = 24, ...props }: IconProps) {
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
      <path d="M11.502 1.13C11.815 0.98 12.26 0.97 12.555 1.17L18.555 5.17C18.833 5.35 19 5.67 19 6V7H22C22.552 7 23 7.45 23 8V22C23 22.55 22.552 23 22 23H2C1.448 23 1 22.55 1 22V8C1 7.45 1.448 7 2 7H5V6.02C5 5.68 5.166 5.37 5.443 5.19L11.502 1.13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 22V18C10 16.9 10.895 16 12 16C13.105 16 14 16.9 14 18V22M18 11V14M18 16V19M6 11V14M6 16V19M6 8H2V22H22V8H18V6L12 2L6 6.02V8ZM12 12C10.895 12 10 11.1 10 10C10 8.9 10.895 8 12 8C13.105 8 14 8.9 14 10C14 11.1 13.105 12 12 12Z"/>
    </svg>
  )
}
