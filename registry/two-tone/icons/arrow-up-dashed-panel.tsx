import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5 21H13.5M3 13.5V10.5M7 3H6C4.34315 3 3 4.34315 3 6M3 18C3 19.6569 4.34315 21 6 21M21 17V18C21 19.6569 19.6569 21 18 21" strokeOpacity="0.4"/>
      <path d="M15.5 3.99999V14M10 8.99999L15.1314 3.40209C15.3296 3.18589 15.6704 3.18589 15.8686 3.40209L21 8.99999"/>
    </svg>
  )
}
