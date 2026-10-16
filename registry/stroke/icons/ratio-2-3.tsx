import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ratio23({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5C5 3.3431 6.3431 2 8 2L16 2C17.6569 2 19 3.3431 19 5L19 19C19 20.6569 17.6569 22 16 22L8 22C6.3431 22 5 20.6569 5 19L5 5Z" fill="none"/>
    </svg>
  )
}
