import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FireExtinguisher({ size = 24, ...props }: IconProps) {
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
      <path d="M7 17L5 17L5 21L3 21L3 11C2.9993 8.3832 4.4584 5.9845 6.7825 4.7819C7.5227 4.3981 8.3258 4.1505 9.1536 4.0507C9.0519 4.3569 9 4.6773 9 4.9999C9 5.3636 9.0659 5.7242 9.1946 6.0644C7.0764 6.4113 5.4153 8.0701 5.0655 10.1878C5.0218 10.4563 4.9999 10.7279 5 11L5 15L7 15L7 17ZM17 15.0001L17 17.0001L7.0001 17L7.0001 15.0001L17 15.0001ZM14.829 4L17.5858 4L19.5858 2L21 3.4142L19.4142 5L21 6.5858L19.5858 8L17.5858 6L14.8291 6C14.9422 5.6788 15 5.3407 15 5.0001C15 4.6594 14.9422 4.3213 14.829 4Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M17 17.0001L17 21C17 21.5523 16.5523 22 16 22L8 22C7.4477 22 7 21.5523 7 21L7 11C6.9994 9.2112 7.9547 7.5585 9.505 6.6662C9.1756 6.173 8.9999 5.5932 8.9999 5.0001C8.9999 3.3432 10.3431 2 12 2C13.6569 2 15.0001 3.3432 15.0001 5.0001C15.0001 5.5932 14.8244 6.173 14.495 6.6662C16.0453 7.5585 17.0006 9.2112 17 11L17 15.0001L7 15.0001L7 17.0001L17 17.0001Z" fill="currentColor"/>
    </svg>
  )
}
