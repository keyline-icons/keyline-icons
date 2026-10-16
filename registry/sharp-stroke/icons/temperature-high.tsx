import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TemperatureHigh({ size = 24, ...props }: IconProps) {
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
      <path d="M4 6C4 3.7909 5.7909 2 8 2C10.2091 2 12 3.7909 12 6L12 11.5279C13.2726 12.6661 14 14.2926 14 16C14 19.3137 11.3137 22 8 22C4.6863 22 2 19.3137 2 16C2 14.2926 2.7274 12.6661 4 11.5279L4 6ZM8 16L8 7.5L8 6.5M22 5C22 6.6569 20.6569 8 19 8C17.3431 8 16 6.6569 16 5C16 3.3431 17.3431 2 19 2C20.6569 2 22 3.3431 22 5Z" fill="none"/>
      <path d="M9.5 16C9.5 16.8284 8.8284 17.5 8 17.5C7.1716 17.5 6.5 16.8284 6.5 16C6.5 15.1716 7.1716 14.5 8 14.5C8.8284 14.5 9.5 15.1716 9.5 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
