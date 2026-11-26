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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 5V9C6 9.5523 6.4477 10 7 10H17C17.5523 10 18 9.5523 18 9V5H23V3H1V5ZM6 19V15C6 14.4477 6.4477 14 7 14H17C17.5523 14 18 14.4477 18 15V19H23V21H1V19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 20H23M1 4H23M7 4H17V9H7V4ZM7 15H17V20H7V15Z"/>
    </svg>
  )
}
