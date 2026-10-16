import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bird({ size = 24, ...props }: IconProps) {
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
      <path d="M10.8703 7.0963L2 19.3162C4.3886 18.9914 6.7693 18.5988 8.1714 17.8575C19.009 18.1077 21.551 8.4795 19.2462 5.3327C16.6431 1.63 13.9428 3.1503 12.918 4.3733L10.8703 7.0963ZM8.1714 17.8575C13.4666 15.0578 12.4764 9.9085 10.8703 7.0963M20.0269 7.2419L22 9.0783L20.0269 10.1M10 17.9861L10 22M13.5 17.4L13.5 20.9714" fill="none"/>
      <path d="M17 8C17 8.5523 16.5523 9 16 9C15.4477 9 15 8.5523 15 8C15 7.4477 15.4477 7 16 7C16.5523 7 17 7.4477 17 8Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
