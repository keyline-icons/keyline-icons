import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeStart({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M23 13V15H21V20C21 20.552 20.552 21 20 21H4C3.448 21 3 20.552 3 20V15H1V13H23ZM23 3V5H17V10C17 10.552 16.552 11 16 11H8C7.448 11 7 10.552 7 10V5H1V3H23Z" fill="currentColor"/>
    </svg>
  )
}
