import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareStop({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6C2 3.790861 3.790861 2 6 2L18 2C20.209139 2 22 3.790861 22 6L22 18C22 20.209139 20.209139 22 18 22L6 22C3.790861 22 2 20.209139 2 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 11C9 9.895431 9.895431 9 11 9L13 9C14.104569 9 15 9.895431 15 11L15 13C15 14.104569 14.104569 15 13 15L11 15C9.895431 15 9 14.104569 9 13Z"/>
    </svg>
  )
}
