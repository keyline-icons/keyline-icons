import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BookmarkStar({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 2L20 2L20 22L12 18.4223L4 22L4 2ZM11.8154 6.8229C11.8466 6.7485 11.9194 6.7 12 6.7C12.0807 6.7 12.1534 6.7485 12.1846 6.8229L13.195 9.2424L15.8159 9.4516C15.9198 9.4599 16 9.5467 16 9.651C16 9.7095 15.9743 9.7651 15.9298 9.8031L13.9336 11.5061L14.5438 14.0534C14.5474 14.0686 14.5492 14.0843 14.5492 14.1C14.5492 14.2105 14.4597 14.3 14.3492 14.3C14.3126 14.3 14.2766 14.2899 14.2453 14.2709L12 12.9051L9.7547 14.2709C9.7234 14.2899 9.6874 14.3 9.6508 14.3C9.5403 14.3 9.4508 14.2105 9.4508 14.1C9.4508 14.0843 9.4526 14.0686 9.4563 14.0534L10.0665 11.5061L8.0702 9.8031C8.0257 9.7651 8 9.7095 8 9.651C8 9.5467 8.0802 9.4599 8.1841 9.4516L10.805 9.2424L11.8154 6.8229Z" fill="none"/>
    </svg>
  )
}
