import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TagOff({ size = 24, ...props }: IconProps) {
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
      <path d="M6.491 17.509L12.15 22.735C12.544 23.099 13.156 23.087 13.535 22.707L22.707 13.535C23.087 13.156 23.099 12.544 22.735 12.15L17.509 6.491L6.491 17.509ZM15.753 4.59L12.735 1.322C12.545 1.117 12.279 1 12 1H2C1.448 1 1 1.448 1 2V12C1 12.279 1.117 12.545 1.322 12.735L4.59 15.753L15.753 4.59Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16.801 7.199L22 12.828L12.828 22L7.199 16.801M22.293 1.707L1.707 22.293"/>
      <path d="M9.5 8C9.5 8.828 8.828 9.5 8 9.5C7.172 9.5 6.5 8.828 6.5 8C6.5 7.172 7.172 6.5 8 6.5C8.828 6.5 9.5 7.172 9.5 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
