import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Luggage({ size = 24, ...props }: IconProps) {
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
      <path d="M9.2808 5L14.7192 5L14.4086 3.7575C14.2973 3.3123 13.8973 3 13.4384 3L10.5616 3C10.1027 3 9.7027 3.3123 9.5914 3.7575L9.2808 5ZM16.7808 5L17 5C18.6569 5 20 6.3431 20 8L20 18C20 19.6569 18.6569 21 17 21L7 21C5.3431 21 4 19.6569 4 18L4 8C4 6.3431 5.3431 5 7 5L7.2192 5L7.6512 3.2723C7.9851 1.9369 9.185 1 10.5616 1L13.4384 1C14.815 1 16.015 1.9369 16.3488 3.2724L16.7808 5Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7 11L17 11M7 20L7 22M17 20L17 22" fill="none"/>
    </svg>
  )
}
