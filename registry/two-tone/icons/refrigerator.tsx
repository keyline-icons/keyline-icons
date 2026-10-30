import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Refrigerator({ size = 24, ...props }: IconProps) {
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
      <path d="M8 1L16 1C18.2092 1 20 2.7908 20 5L20 19C20 21.2092 18.2092 23 16 23L8 23C5.7908 23 4 21.2092 4 19L4 5C4 2.7908 5.7908 1 8 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 2L16 2C17.6569 2 19 3.3431 19 5L19 19C19 20.6569 17.6569 22 16 22L8 22C6.3431 22 5 20.6569 5 19L5 5C5 3.3431 6.3431 2 8 2ZM5 11L19 11M9 6L9 7M9 15L9 18" fill="none"/>
    </svg>
  )
}
