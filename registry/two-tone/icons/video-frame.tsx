import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VideoFrame({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8V6C3 4.34315 4.34315 3 6 3H8M16 3H18C19.6569 3 21 4.34315 21 6V8M8 21H6C4.34315 21 3 19.6569 3 18V16" strokeOpacity="0.4"/>
      <path d="M7.9627 8.1055C7.9627 7.3201 8.8267 6.8413 9.4927 7.2575L14.8023 10.576C15.1156 10.7718 15.1156 11.2282 14.8023 11.424L9.4927 14.7425C8.8267 15.1587 7.9627 14.6799 7.9627 13.8945L7.9627 8.1055ZM18 15V21M15 18L18 21L21 18"/>
    </svg>
  )
}
