import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Clock2({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1ZM11 6L11 12C11 12.3573 11.1906 12.6874 11.5 12.866C11.8094 13.0447 12.1906 13.0447 12.5 12.866L16.8301 10.366C17.0598 10.2334 17.2274 10.015 17.296 9.7588C17.3647 9.5026 17.3287 9.2297 17.1961 9C16.92 8.5217 16.3084 8.3578 15.8301 8.634L13 10.2679L13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
