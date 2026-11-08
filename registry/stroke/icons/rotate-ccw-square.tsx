import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCcwSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M14.4 2L12 4.25L14.4 6.5M12 4.25H18.4C19.2836 4.25 20 4.92 20 5.75V9M15 20V13C15 11.9 14.1046 11 13 11H6C4.8954 11 4 11.9 4 13V20C4 21.1 4.8954 22 6 22H13C14.1046 22 15 21.1 15 20Z"/>
    </svg>
  )
}
