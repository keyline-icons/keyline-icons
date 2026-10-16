import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Clock4({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1ZM11 6L11 12C11 12.3573 11.1906 12.6874 11.5 12.866L15.8301 15.366C16.3084 15.6422 16.92 15.4783 17.1961 15C17.3287 14.7703 17.3647 14.4974 17.296 14.2412C17.2274 13.985 17.0598 13.7666 16.8301 13.634L13 11.4227L13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
