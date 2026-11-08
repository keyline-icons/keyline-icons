import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12H2M11.7394 2.13L8.0416 7.61C7.9242 7.78 8.0693 8 8.3021 8H15.6979C15.9307 8 16.0758 7.78 15.9585 7.61L12.2606 2.13C12.1442 1.96 11.8558 1.96 11.7394 2.13ZM11.7394 21.87L8.0416 16.39C7.9242 16.22 8.0693 16 8.3021 16H15.6979C15.9307 16 16.0758 16.22 15.9585 16.39L12.2606 21.87C12.1442 22.04 11.8558 22.04 11.7394 21.87Z"/>
    </svg>
  )
}
