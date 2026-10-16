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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10.2477 2.4184L16.682 11.4184C16.8033 11.5881 16.8685 11.7914 16.8685 12C16.8685 12.2086 16.8033 12.4119 16.682 12.5816L10.2477 21.5816C10.06 21.8442 9.7571 22 9.4343 22C9.1115 22 8.8085 21.8442 8.6208 21.5816L2.1865 12.5816C2.0652 12.4119 2 12.2086 2 12C2 11.7914 2.0652 11.5881 2.1865 11.4184L8.6208 2.4184C8.8085 2.1558 9.1115 2 9.4343 2C9.7571 2 10.06 2.1558 10.2477 2.4184Z" fill="currentColor" stroke="none"/>
      <path d="M14.8048 2.5482L21 12L14.8048 21.4518" fill="none" strokeOpacity="0.4"/>
    </svg>
  )
}
