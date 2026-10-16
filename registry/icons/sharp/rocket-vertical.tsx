import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RocketVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M9.3652 20.8056L14.6348 20.8056L15.8292 22L19 16.1684L15.9523 13.1206C16.0677 12.4475 16.1257 11.7657 16.1257 11.0828C16.1257 7.6016 14.6216 4.2903 12 1.9999C9.3784 4.2903 7.8743 7.6016 7.8743 11.0828C7.8743 11.7657 7.9323 12.4475 8.0477 13.1206L5 16.1684L8.1708 22L9.3652 20.8056ZM14.6348 20.8056L15.9523 13.1206M9.3652 20.8056L8.0477 13.1206"/>
    </svg>
  )
}
