import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Radio({ size = 24, ...props }: IconProps) {
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
      <path d="M5 8L19 8C20.6569 8 22 9.3431 22 11L22 17C22 18.6569 20.6569 20 19 20L5 20C3.3431 20 2 18.6569 2 17L2 11C2 9.3431 3.3431 8 5 8ZM6 8L16 4M10 14C10 15.1046 9.1046 16 8 16C6.8954 16 6 15.1046 6 14C6 12.8954 6.8954 12 8 12C9.1046 12 10 12.8954 10 14ZM14 12L18 12M14 16L18 16"/>
    </svg>
  )
}
