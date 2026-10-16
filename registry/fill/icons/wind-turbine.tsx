import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WindTurbine({ size = 24, ...props }: IconProps) {
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
      <path d="M15.5 9.5C15.5 11.433 13.933 13 12 13C10.067 13 8.5 11.433 8.5 9.5C8.5 7.567 10.067 6 12 6C13.933 6 15.5 7.567 15.5 9.5Z" fill="currentColor" stroke="none"/>
      <path d="M12 6L12 2M15.0311 11.25L18.4952 13.25M8.9689 11.25L5.5048 13.25M12 13L12 22M5 22L19 22M16 2.5718C18.4752 4.0009 20 6.6419 20 9.5C20 9.5146 20 9.5292 19.9999 9.5438M4.0001 9.5438C4 9.5292 4 9.5146 4 9.5C4 6.6419 5.5248 4.0009 8 2.5718" fill="none"/>
    </svg>
  )
}
