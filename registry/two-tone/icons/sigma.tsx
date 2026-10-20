import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sigma({ size = 24, ...props }: IconProps) {
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
      <path d="M18 3L7.0019 3C6.1681 3 5.7005 3.9604 6.2147 4.6168L11.5167 11.3832C11.8005 11.7454 11.8005 12.2546 11.5167 12.6168L6.2147 19.3832C5.7005 20.0396 6.1681 21 7.0019 21L18 21" fill="none"/>
    </svg>
  )
}
