import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Keyframes({ size = 24, ...props }: IconProps) {
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
      <path d="M7.7702 2.8906C8.1411 2.3342 8.7656 2 9.4343 2C10.103 2 10.7274 2.3342 11.0984 2.8906L16.6166 11.1679C16.7809 11.4144 16.8685 11.7039 16.8685 12C16.8685 12.2961 16.7809 12.5856 16.6166 12.8321L11.0984 21.1094C10.7274 21.6658 10.103 22 9.4343 22C8.7656 22 8.1411 21.6658 7.7702 21.1094L2.2519 12.8321C2.0877 12.5856 2 12.2961 2 12C2 11.7039 2.0877 11.4144 2.2519 11.1679L7.7702 2.8906Z" fill="currentColor" stroke="none"/>
      <path d="M15.1009 3L20.916 11.7226C20.9708 11.8048 21 11.9013 21 12C21 12.0987 20.9708 12.1952 20.916 12.2774L15.1009 21" fill="none"/>
    </svg>
  )
}
