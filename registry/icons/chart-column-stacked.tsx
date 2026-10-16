import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartColumnStacked({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L3 19C3 20.1046 3.8954 21 5 21L21 21M9 8L11 8C11.5523 8 12 8.4477 12 9L12 16C12 16.5523 11.5523 17 11 17L9 17C8.4477 17 8 16.5523 8 16L8 9C8 8.4477 8.4477 8 9 8ZM17 5L19 5C19.5523 5 20 5.4477 20 6L20 16C20 16.5523 19.5523 17 19 17L17 17C16.4477 17 16 16.5523 16 16L16 6C16 5.4477 16.4477 5 17 5ZM8 12L12 12M16 10L20 10" fill="none"/>
    </svg>
  )
}
