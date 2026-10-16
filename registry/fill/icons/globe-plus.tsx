import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GlobePlus({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 11.4477 22.5523 11 22 11L16.9658 11C16.7774 8.2182 15.8031 5.4794 14.0649 3L9.9351 3C8.1969 5.4793 7.2226 8.2182 7.0342 11L3 11L3 13L7.0342 13C7.2658 16.4205 8.6858 19.7761 11.2529 22.6641C11.4504 22.8863 11.7246 22.998 12 22.998L12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1ZM12 3.5713C13.7801 5.8823 14.7568 8.4349 14.958 11L9.042 11C9.2432 8.4349 10.2199 5.8823 12 3.5713Z" fill="currentColor" stroke="none"/>
      <path d="M19 16V22M22 19H16"/>
    </svg>
  )
}
