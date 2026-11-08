import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HistoryCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22C6.4772 22 2 17.52 2 12C2 8.96 3.3577 6.23 5.5 4.4C5.6619 4.26 5.8284 4.13 5.999 4M22 12C22 6.48 17.5228 2 12 2C11.6625 2 11.3289 2.02 11 2.05M12 6V12H17M16 19L18 21L22 17M3.0454 3L6.0617 3.86C6.3273 3.94 6.4811 4.21 6.4054 4.48L5.5451 7.49"/>
    </svg>
  )
}
