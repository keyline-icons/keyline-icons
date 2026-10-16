import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TimerFast({ size = 24, ...props }: IconProps) {
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
      <path d="M6.3699 8.2986L6.7085 8C8.1699 6.7112 10.0515 6 12 6C16.4183 6 20 9.5817 20 14C20 18.4183 16.4183 22 12 22C10.0515 22 8.1699 21.2888 6.7085 20L6.3699 19.7014M8 2L16 2M12 2L12 6M12 15L12 9M17.6569 8.3431L19.2929 6.7071M3 12L9 12M3 16L8 16" fill="none"/>
    </svg>
  )
}
