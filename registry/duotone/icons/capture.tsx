import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Capture({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3L19 3C21.2092 3 23 4.7908 23 7L23 17C23 19.2092 21.2092 21 19 21L5 21C2.7908 21 1 19.2092 1 17L1 7C1 4.7908 2.7908 3 5 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 10V9C6 8.4477 6.4477 8 7 8H9M15 8H17C17.5523 8 18 8.4477 18 9V10M18 14V15C18 15.5523 17.5523 16 17 16H15M9 16H7C6.4477 16 6 15.5523 6 15V14"/>
    </svg>
  )
}
