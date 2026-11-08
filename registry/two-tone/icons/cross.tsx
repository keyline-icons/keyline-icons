import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cross({ size = 24, ...props }: IconProps) {
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
      <path d="M16.375 7.12C16.375 7.4 16.5989 7.62 16.875 7.62H19.5C20.8807 7.62 22 8.74 22 10.12V13.88C22 15.26 20.8807 16.38 19.5 16.38H16.875C16.5989 16.38 16.375 16.6 16.375 16.88V19.5C16.375 20.88 15.2557 22 13.875 22H10.125C8.7443 22 7.625 20.88 7.625 19.5V16.88C7.625 16.6 7.4011 16.38 7.125 16.38H4.5C3.1193 16.38 2 15.26 2 13.88V10.12C2 8.74 3.1193 7.62 4.5 7.62H7.125C7.4011 7.62 7.625 7.4 7.625 7.12V4.5C7.625 3.12 8.7443 2 10.125 2H13.875C15.2557 2 16.375 3.12 16.375 4.5V7.12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 10.12V13.88C3 14.7 3.6716 15.38 4.5 15.38H7.125C7.9534 15.38 8.625 16.05 8.625 16.88V19.5C8.625 20.33 9.2966 21 10.125 21H13.875C14.7034 21 15.375 20.33 15.375 19.5V16.88C15.375 16.05 16.0466 15.38 16.875 15.38H19.5C20.3284 15.38 21 14.7 21 13.88V10.12C21 9.3 20.3284 8.62 19.5 8.62H16.875C16.0466 8.62 15.375 7.95 15.375 7.12V4.5C15.375 3.67 14.7034 3 13.875 3H10.125C9.2966 3 8.625 3.67 8.625 4.5V7.12C8.625 7.95 7.9534 8.62 7.125 8.62H4.5C3.6716 8.62 3 9.3 3 10.12Z"/>
    </svg>
  )
}
