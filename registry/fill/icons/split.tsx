import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Split({ size = 24, ...props }: IconProps) {
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
      <path d="M12 21L12 16C12 14.3431 10.6569 13 9 13C7.3431 13 6 11.6569 6 10L6 3M12 16C12 14.3431 13.3431 13 15 13C16.6569 13 18 11.6569 18 10L18 3M3 6L6 3L9 6M15 6L18 3L21 6" fill="none"/>
    </svg>
  )
}
