import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowInDownRightDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5 21H13.5M21 13.5V10.5M3 17V18C3 19.6569 4.34315 21 6 21M18 21C19.6569 21 21 19.6569 21 18M17 3H18C19.6569 3 21 4.34315 21 6" strokeOpacity="0.4"/>
      <path d="M3 12.5H12C12.2761 12.5 12.5 12.2761 12.5 12V3M3 3L12 12"/>
    </svg>
  )
}
