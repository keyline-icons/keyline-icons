import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalSpaceBetween({ size = 24, ...props }: IconProps) {
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
      <path d="M6 5V9C6 9.5523 6.448 10 7 10H17C17.552 10 18 9.5523 18 9V5H23V3H1V5H6ZM6 19V15C6 14.4477 6.448 14 7 14H17C17.552 14 18 14.4477 18 15V19H23V21H1V19H6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
