import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclePlayOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19.7782 19.7782C17.7153 21.8411 14.9174 23 12 23C5.9249 23 1 18.0751 1 12C1 9.0826 2.1589 6.2847 4.2218 4.2218L7.9627 7.9627L7.9627 16.6987C7.9627 17.251 8.4104 17.6987 8.9627 17.6987C9.1501 17.6987 9.3338 17.646 9.4927 17.5467L14.449 14.449ZM6.3532 2.558C8.0038 1.5687 9.9355 1 12 1C18.0753 1 23 5.9247 23 12C23 14.0645 22.4313 15.9962 21.442 17.6468Z" fill="currentColor" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
