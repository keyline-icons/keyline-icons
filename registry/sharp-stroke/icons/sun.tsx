import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sun({ size = 24, ...props }: IconProps) {
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
      <path d="M16.5 12C16.5 14.4854 14.4854 16.5 12 16.5C9.5147 16.5 7.5 14.4854 7.5 12C7.5 9.5147 9.5147 7.5 12 7.5C14.4854 7.5 16.5 9.5147 16.5 12ZM19.5 12L23 12M17.3033 17.3033L19.7782 19.7782M12 19.5L12 23M6.6967 17.3033L4.2218 19.7782M4.5 12L1 12M6.6967 6.6967L4.2218 4.2218M12 4.5L12 1M17.3033 6.6967L19.7782 4.2218" fill="none"/>
    </svg>
  )
}
