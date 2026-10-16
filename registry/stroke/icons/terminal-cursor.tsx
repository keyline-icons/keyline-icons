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
      <path d="M20 18.9999H13M14.7026 5.35175L11.5789 14.9795C11.4412 15.4136 10.8422 15.4525 10.6494 15.04L8.61378 10.6858C8.56101 10.573 8.46799 10.4838 8.35296 10.436L4.30741 8.72095C3.88071 8.54335 3.90275 7.93152 4.34114 7.78509L14.0677 4.72626C14.4554 4.59674 14.8263 4.96206 14.7026 5.35175Z"/>
    </svg>
  )
}
