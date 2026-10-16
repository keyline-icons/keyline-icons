import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Play({ size = 24, ...props }: IconProps) {
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
      <path d="M6.5547 3.1679L18.5547 11.1679C18.8329 11.3534 19 11.6656 19 12C19 12.3344 18.8329 12.6466 18.5547 12.8321L6.5547 20.8321C6.2478 21.0366 5.8533 21.0557 5.5281 20.8817C5.203 20.7077 5 20.3688 5 20L5 4C5 3.6312 5.203 3.2923 5.5281 3.1183C5.8533 2.9443 6.2478 2.9634 6.5547 3.1679Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 4L18 12L6 20L6 4Z"/>
    </svg>
  )
}
