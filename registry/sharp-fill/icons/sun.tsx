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
      <path d="M17.5 12C17.5 14.8996 14.8996 17.5 12 17.5C9.1005 17.5 6.5 14.8996 6.5 12C6.5 9.1005 9.1005 6.5 12 6.5C14.8996 6.5 17.5 9.1005 17.5 12Z" fill="currentColor" stroke="none"/>
      <path d="M19.5 12L23 12M17.3033 17.3033L19.7782 19.7782M12 19.5L12 23M6.6967 17.3033L4.2218 19.7782M4.5 12L1 12M6.6967 6.6967L4.2218 4.2218M12 4.5L12 1M17.3033 6.6967L19.7782 4.2218" fill="none"/>
    </svg>
  )
}
