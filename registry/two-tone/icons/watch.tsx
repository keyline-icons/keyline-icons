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
      <path d="M7.0999 5.1382L7.3982 2.7519C7.5233 1.7511 8.3741 1 9.3828 1L14.6172 1C15.6259 1 16.4767 1.7511 16.6018 2.7519L16.9001 5.1382C18.1498 5.5313 19 6.6899 19 8L19 16C19 17.3101 18.1498 18.4687 16.9001 18.8618L16.6018 21.2481C16.4767 22.2489 15.6259 23 14.6172 23L9.3828 23C8.3741 23 7.5233 22.2489 7.3982 21.2481L7.0999 18.8618C5.8502 18.4687 5 17.3101 5 16L5 8C5 6.6899 5.8502 5.5313 7.0999 5.1382Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 6L16 6C17.1046 6 18 6.8954 18 8L18 16C18 17.1046 17.1046 18 16 18L8 18C6.8954 18 6 17.1046 6 16L6 8C6 6.8954 6.8954 6 8 6ZM8 6L8.3905 2.876C8.4531 2.3755 8.8785 2 9.3828 2L14.6172 2C15.1215 2 15.5469 2.3755 15.6095 2.876L16 6M8 18L8.3905 21.124C8.4531 21.6245 8.8785 22 9.3828 22L14.6172 22C15.1215 22 15.5469 21.6245 15.6095 21.124L16 18"/>
    </svg>
  )
}
