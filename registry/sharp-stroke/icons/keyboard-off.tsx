import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeyboardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20 20L2 20L2 4L4 4M7 16L16 16M8.6569 4L22 4L22 17.3431M1.7071 1.7071L22.2929 22.2929" fill="none"/>
      <path d="M13 7L15 7L15 9L13 9L13 7ZM17 7L19 7L19 9L17 9L17 7ZM5 11L7 11L7 13L5 13L5 11ZM17 11L19 11L19 13L17 13L17 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
