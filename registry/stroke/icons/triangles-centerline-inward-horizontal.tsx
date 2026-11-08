import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineInwardHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M22 12H2M11.7394 7.87L8.0416 2.39C7.9242 2.22 8.0693 2 8.3021 2H15.6979C15.9307 2 16.0758 2.22 15.9585 2.39L12.2606 7.87C12.1442 8.04 11.8558 8.04 11.7394 7.87ZM11.7394 16.13L8.0416 21.61C7.9242 21.78 8.0693 22 8.3021 22H15.6979C15.9307 22 16.0758 21.78 15.9585 21.61L12.2606 16.13C12.1442 15.96 11.8558 15.96 11.7394 16.13Z"/>
    </svg>
  )
}
