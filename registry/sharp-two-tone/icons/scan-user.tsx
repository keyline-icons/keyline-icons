import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanUser({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9L3 3L9 3M15 3L21 3L21 9M21 15L21 21L15 21M9 21L3 21L3 15" fill="none" strokeOpacity="0.4"/>
      <path d="M13.5 7.5C13.5 8.3284 12.8284 9 12 9C11.1716 9 10.5 8.3284 10.5 7.5C10.5 6.6716 11.1716 6 12 6C12.8284 6 13.5 6.6716 13.5 7.5ZM8 13L16 13L16 17L8 17Z" fill="none"/>
    </svg>
  )
}
