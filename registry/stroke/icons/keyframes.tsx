import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Keyframes({ size = 24, ...props }: IconProps) {
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
      <path d="M8.6022 3.4453C8.7877 3.1671 9.0999 3 9.4343 3C9.7686 3 10.0808 3.1671 10.2663 3.4453L15.7845 11.7226C15.8393 11.8048 15.8685 11.9013 15.8685 12C15.8685 12.0987 15.8393 12.1952 15.7845 12.2774L10.2663 20.5547C10.0808 20.8329 9.7686 21 9.4343 21C9.0999 21 8.7877 20.8329 8.6022 20.5547L3.084 12.2774C3.0292 12.1952 3 12.0987 3 12C3 11.9013 3.0292 11.8048 3.084 11.7226L8.6022 3.4453ZM15.1009 3L20.916 11.7226C20.9708 11.8048 21 11.9013 21 12C21 12.0987 20.9708 12.1952 20.916 12.2774L15.1009 21" fill="none"/>
    </svg>
  )
}
