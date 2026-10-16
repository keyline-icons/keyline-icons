import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Rewind({ size = 24, ...props }: IconProps) {
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
      <path d="M22 16.495037C22 17.809976 20.428429 18.488512 19.47137 17.586788L14.314246 12.727834C13.89525 12.333063 13.89525 11.666937 14.314246 11.272166L19.47137 6.413212C20.428429 5.511488 22 6.190024 22 7.504963ZM10 16.495037C10 17.809976 8.428429 18.488512 7.47137 17.586788L2.314246 12.727834C1.89525 12.333063 1.89525 11.666937 2.314246 11.272166L7.47137 6.413212C8.428429 5.511488 10 6.190024 10 7.504963Z"/>
    </svg>
  )
}
