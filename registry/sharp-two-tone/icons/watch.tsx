import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Watch({ size = 24, ...props }: IconProps) {
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
      <path d="M7.1172 5L7.5077 1.876C7.5703 1.3755 7.9957 1 8.5 1L15.5 1C16.0043 1 16.4297 1.3755 16.4923 1.876L16.8828 5L18 5C18.5523 5 19 5.4477 19 6L19 18C19 18.5523 18.5523 19 18 19L16.8828 19L16.4923 22.124C16.4297 22.6245 16.0043 23 15.5 23L8.5 23C7.9957 23 7.5703 22.6245 7.5077 22.124L7.1172 19L6 19C5.4477 19 5 18.5523 5 18L5 6C5 5.4477 5.4477 5 6 5L7.1172 5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 6L18 6L18 18L6 18L6 6ZM8 6L8.5 2L15.5 2L16 6M8 18L8.5 22L15.5 22L16 18"/>
    </svg>
  )
}
