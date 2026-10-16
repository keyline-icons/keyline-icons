import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareCaretDown({ size = 24, ...props }: IconProps) {
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
      <path d="M6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3Z"/>
      <path d="M11.5301 16.2267L7.06842 8.28926C6.86937 7.93516 7.12844 7.5 7.5383 7.5H16.4617C16.8716 7.5 17.1306 7.93516 16.9316 8.28926L12.4699 16.2267C12.2651 16.5911 11.7349 16.5911 11.5301 16.2267Z"/>
    </svg>
  )
}
