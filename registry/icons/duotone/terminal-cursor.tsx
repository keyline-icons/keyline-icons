import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TerminalCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M13.7685 3.77335C14.9255 3.40141 16.0247 4.49133 15.6562 5.65421L15.6542 5.66104L12.5302 15.289C12.1131 16.5848 10.3216 16.6992 9.74409 15.4638L7.78901 11.2831L3.91791 9.64249L3.91889 9.64151C2.64383 9.1059 2.71202 7.2754 4.02534 6.83682L4.03315 6.83389L4.04194 6.83194L13.7685 3.77335Z" fill="currentColor" stroke="none"/>
      <path d="M20 19H13" strokeOpacity="0.4"/>
    </svg>
  )
}
