import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCwSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M9.6 2L12 4.25L9.6 6.5M12 4.25H5.6C4.7164 4.25 4 4.92 4 5.75V9M9 20V13C9 11.9 9.8954 11 11 11H18C19.1046 11 20 11.9 20 13V20C20 21.1 19.1046 22 18 22H11C9.8954 22 9 21.1 9 20Z"/>
    </svg>
  )
}
