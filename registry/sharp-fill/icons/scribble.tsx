import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Scribble({ size = 24, ...props }: IconProps) {
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
      <path d="M1.68 13.54L2 13.25C5.5 10.01 11.942 4.22 13.111 3.46C14.778 2.37 16.712 3.39 17 5.09C17.556 8.35 11.445 13.25 8.667 15.97C5.889 18.69 8.667 20.86 10.889 19.78C12.38 19.05 17.086 13.76 18.667 13.25C20.334 12.7 21.445 14.34 20.334 15.97C19.359 17.4 17 20.32 18.111 20.86C19.223 21.41 20.889 20.32 22 19.23L22.301 18.94"/>
    </svg>
  )
}
