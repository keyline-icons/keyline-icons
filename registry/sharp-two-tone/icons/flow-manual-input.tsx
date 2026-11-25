import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowManualInput({ size = 24, ...props }: IconProps) {
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
      <path d="M11.8039 6.0196L21.8039 4.0198C21.8685 4.0069 21.9342 4.0004 22 4.0004C22.5523 4.0004 23 4.4481 23 5.0004L23 19C23 19.5523 22.5523 20 22 20L2 20C1.4477 20 1 19.5523 1 19L1 8.9999C1 8.5232 1.3365 8.1128 1.8039 8.0193Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 8.9999L22 5.0004L22 19L2 19Z"/>
    </svg>
  )
}
