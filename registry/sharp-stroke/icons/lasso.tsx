import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lasso({ size = 24, ...props }: IconProps) {
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
      <path d="M3 7.5C3 5.0147 6.5817 3 11 3C15.4183 3 19 5.0147 19 7.5C19 9.9853 15.4183 12 11 12C6.5817 12 3 9.9853 3 7.5ZM16.3089 10.9236L16.5 11C19 12 20 13.5 18.5 15.5C17 17.5 18.5 19.5 21 21L21.2929 21.2929"/>
    </svg>
  )
}
