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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8 6L16 6C17.1046 6 18 6.8954 18 8L18 16C18 17.1046 17.1046 18 16 18L8 18C6.8954 18 6 17.1046 6 16L6 8C6 6.8954 6.8954 6 8 6ZM8 6L8.3905 2.876C8.4531 2.3755 8.8785 2 9.3828 2L14.6172 2C15.1215 2 15.5469 2.3755 15.6095 2.876L16 6M8 18L8.3905 21.124C8.4531 21.6245 8.8785 22 9.3828 22L14.6172 22C15.1215 22 15.5469 21.6245 15.6095 21.124L16 18"/>
    </svg>
  )
}
