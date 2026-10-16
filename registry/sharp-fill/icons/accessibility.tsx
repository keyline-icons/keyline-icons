import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Accessibility({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM7 10L7 12L11 12L11 12.7639L8.8292 17.1056L10.618 18L12 15.2361L13.382 18L15.1708 17.1056L13 12.7639L13 12L17 12L17 10L7 10ZM13.5 6.5C13.5 5.6716 12.8284 5 12 5C11.1716 5 10.5 5.6716 10.5 6.5C10.5 7.3284 11.1716 8 12 8C12.8284 8 13.5 7.3284 13.5 6.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
