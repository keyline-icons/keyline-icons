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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM8 10C7.4477 10 7 10.4477 7 11C7 11.5523 7.4477 12 8 12L11 12L11 12.7639L9.1056 16.5528C9.0361 16.6916 9 16.8448 9 17C9 17.5523 9.4477 18 10 18C10.3788 18 10.725 17.786 10.8944 17.4472L12 15.2361L13.1056 17.4472C13.275 17.786 13.6212 18 14 18C14.5523 18 15 17.5523 15 17C15 16.8448 14.9639 16.6916 14.8944 16.5528L13 12.7639L13 12L16 12C16.5523 12 17 11.5523 17 11C17 10.4477 16.5523 10 16 10L8 10ZM13.5 6.5C13.5 5.6716 12.8284 5 12 5C11.1716 5 10.5 5.6716 10.5 6.5C10.5 7.3284 11.1716 8 12 8C12.8284 8 13.5 7.3284 13.5 6.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
