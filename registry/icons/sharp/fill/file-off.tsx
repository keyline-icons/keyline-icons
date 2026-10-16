import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileOff({ size = 24, ...props }: IconProps) {
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
      <path d="M16 23L4 23C3.4477 23 3 22.5523 3 22L3 3L21 21L21 22C21 22.5523 20.5523 23 20 23ZM6.5 1L14 1C14.2652 1 14.5195 1.1054 14.707 1.293L20.7071 7.2929C20.8946 7.4805 21 7.7348 21 8L21 15.3431L19 15.3431L6.5 3L6.5 1ZM14 8L18.5858 8L14 3.4142L14 8Z" fill="currentColor" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
