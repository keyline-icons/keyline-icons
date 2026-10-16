import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseCog({ size = 24, ...props }: IconProps) {
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
      <path d="M1.6141 11.0785L2 10.7782L12 2.9963L22 10.7782L22.3859 11.0785M4 9.2218L4 21L20 21L20 9.2218M14.5 13C14.5 14.3807 13.3807 15.5 12 15.5C10.6193 15.5 9.5 14.3807 9.5 13C9.5 11.6193 10.6193 10.5 12 10.5C13.3807 10.5 14.5 11.6193 14.5 13ZM14.74 13L16.75 13M13.9375 14.9375L15.3588 16.3588M12 15.74L12 17.75M10.0625 14.9375L8.6412 16.3588M9.26 13L7.25 13M10.0625 11.0625L8.6412 9.6412M12 10.26L12 8.25M13.9375 11.0625L15.3588 9.6412"/>
    </svg>
  )
}
