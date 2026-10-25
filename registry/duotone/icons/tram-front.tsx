import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TramFront({ size = 24, ...props }: IconProps) {
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
      <path d="M7 5L17 5C19.2092 5 21 6.7908 21 9L21 17C21 19.2092 19.2092 21 17 21L7 21C4.7908 21 3 19.2092 3 17L3 9C3 6.7908 4.7908 5 7 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 12L20 12M8 2L16 2M10 6L12 2L14 6M8 20L7 22M16 20L17 22" fill="none"/>
      <path d="M9 16C9 16.5523 8.5523 17 8 17C7.4477 17 7 16.5523 7 16C7 15.4477 7.4477 15 8 15C8.5523 15 9 15.4477 9 16ZM17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
