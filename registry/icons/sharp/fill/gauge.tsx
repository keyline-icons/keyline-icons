import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Gauge({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM13 10.2679L13 6L11 6L11 10.2679C10.3812 10.6252 10 11.2855 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 11.2855 13.6188 10.6252 13 10.2679ZM7 12C7 11.4477 6.5523 11 6 11C5.4477 11 5 11.4477 5 12C5 12.5523 5.4477 13 6 13C6.5523 13 7 12.5523 7 12ZM8.7574 7.7574C8.7574 7.2051 8.3096 6.7574 7.7574 6.7574C7.2051 6.7574 6.7574 7.2051 6.7574 7.7574C6.7574 8.3096 7.2051 8.7574 7.7574 8.7574C8.3096 8.7574 8.7574 8.3096 8.7574 7.7574ZM17.2426 7.7574C17.2426 7.2051 16.7949 6.7574 16.2426 6.7574C15.6904 6.7574 15.2426 7.2051 15.2426 7.7574C15.2426 8.3096 15.6904 8.7574 16.2426 8.7574C16.7949 8.7574 17.2426 8.3096 17.2426 7.7574ZM19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
