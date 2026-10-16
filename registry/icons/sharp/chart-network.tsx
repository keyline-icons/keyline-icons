import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartNetwork({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L3 21L22 21M11 7C11 8.1046 10.1046 9 9 9C7.8954 9 7 8.1046 7 7C7 5.8954 7.8954 5 9 5C10.1046 5 11 5.8954 11 7ZM13 15C13 16.1046 12.1046 17 11 17C9.8954 17 9 16.1046 9 15C9 13.8954 9.8954 13 11 13C12.1046 13 13 13.8954 13 15ZM21 13C21 14.1046 20.1046 15 19 15C17.8954 15 17 14.1046 17 13C17 11.8954 17.8954 11 19 11C20.1046 11 21 11.8954 21 13ZM9.4851 8.9403L10.5149 13.0597M12.9403 14.5149L17.0597 13.4851" fill="none"/>
    </svg>
  )
}
