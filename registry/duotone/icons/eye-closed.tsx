import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EyeClosed({ size = 24, ...props }: IconProps) {
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
      <path d="M2 8C4.3607 11.1476 8.0655 13 12 13C15.9345 13 19.6393 11.1476 22 8M19.3473 10.6127L21.3142 13.3199M14.5989 12.7268L15.2946 15.9999M9.4011 12.7268L8.7054 16M4.6527 10.6127L2.6858 13.3199" fill="none"/>
    </svg>
  )
}
