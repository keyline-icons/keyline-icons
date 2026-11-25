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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.0656 5.7937L18.0656 4.1121C20.5812 3.5077 23 5.4142 23 8.0014L23 16C23 18.2092 21.2092 20 19 20L5 20C2.7908 20 1 18.2092 1 16L1 11.3647C1 9.5154 2.2676 7.9073 4.0656 7.4753Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.2992 8.4476L18.2992 5.0844C20.1859 4.6311 22 6.061 22 8.0014L22 16C22 17.6569 20.6569 19 19 19L5 19C3.3431 19 2 17.6569 2 16L2 11.3647C2 9.9777 2.9507 8.7716 4.2992 8.4476Z"/>
    </svg>
  )
}
