import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaseLower({ size = 24, ...props }: IconProps) {
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
      <path d="M11 12.5C11 14.9853 8.9853 17 6.5 17C4.0147 17 2 14.9853 2 12.5C2 10.0147 4.0147 8 6.5 8C8.9853 8 11 10.0147 11 12.5ZM11 6V18" strokeOpacity="0.4"/>
      <path d="M22 14C22 15.6569 20.6569 17 19 17C17.3431 17 16 15.6569 16 14C16 12.3431 17.3431 11 19 11C20.6569 11 22 12.3431 22 14ZM22 9V18"/>
    </svg>
  )
}
