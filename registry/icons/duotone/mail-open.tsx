import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M9.675 1.7451L2.675 6.7451C1.6239 7.4959 1 8.7082 1 10L1 19C1 21.2091 2.7909 23 5 23L19 23C21.2091 23 23 21.2091 23 19L23 10C23 8.7082 22.3761 7.4959 21.325 6.7451L14.325 1.7451C12.9342 0.7516 11.0658 0.7516 9.675 1.7451Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 10L10.8375 16.3125C11.5329 16.8092 12.4671 16.8092 13.1625 16.3125L22 10"/>
    </svg>
  )
}
