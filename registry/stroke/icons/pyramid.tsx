import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pyramid({ size = 24, ...props }: IconProps) {
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
      <path d="M2.1809 16.032L12 2L21.8191 16.032C22.1736 16.5385 21.988 17.2422 21.4298 17.5081L12 22L2.5702 17.5081C2.012 17.2422 1.8264 16.5385 2.1809 16.032ZM12 2L12 22" fill="none"/>
    </svg>
  )
}
