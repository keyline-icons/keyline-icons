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
      <path d="M7 5L17 5C19.2092 5 21 6.7908 21 9L21 17C21 19.2092 19.2092 21 17 21L7 21C4.7908 21 3 19.2092 3 17L3 9C3 6.7908 4.7908 5 7 5ZM5 11L19 11L19 9C19 7.8954 18.1046 7 17 7L7 7C5.8954 7 5 7.8954 5 9L5 11ZM9 16C9 15.4477 8.5523 15 8 15C7.4477 15 7 15.4477 7 16C7 16.5523 7.4477 17 8 17C8.5523 17 9 16.5523 9 16ZM17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17C16.5523 17 17 16.5523 17 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 2L16 2M10 6L12 2L14 6M8 20L7 22M16 20L17 22" fill="none"/>
    </svg>
  )
}
