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
      <path d="M3 6C3 3.2386 5.2386 1 8 1C10.7614 1 13 3.2386 13 6L13 11.101C14.282 12.4094 15 14.1682 15 16C15 19.866 11.866 23 8 23C4.134 23 1 19.866 1 16C1 14.1682 1.718 12.4094 3 11.101L3 6ZM9 12.6459L9 6.5L7 6.5L7 12.6459C5.5167 13.0881 4.5 14.4522 4.5 16C4.5 17.933 6.067 19.5 8 19.5C9.933 19.5 11.5 17.933 11.5 16C11.5 14.4522 10.4833 13.0881 9 12.6459ZM9.5 16C9.5 16.8284 8.8284 17.5 8 17.5C7.1716 17.5 6.5 16.8284 6.5 16C6.5 15.1716 7.1716 14.5 8 14.5C8.8284 14.5 9.5 15.1716 9.5 16Z" fill="currentColor" stroke="none"/>
      <path d="M22 5C22 6.6569 20.6569 8 19 8C17.3431 8 16 6.6569 16 5C16 3.3431 17.3431 2 19 2C20.6569 2 22 3.3431 22 5Z" fill="none"/>
    </svg>
  )
}
