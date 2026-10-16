import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CirclePlay({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 17.937 17.937 23 12 23C6.063 23 1 17.937 1 12C1 6.063 6.063 1 12 1C17.937 1 23 6.063 23 12ZM9.4927 6.4533L17.0107 11.152C17.6374 11.5437 17.6374 12.4563 17.0107 12.848L9.4927 17.5467C8.8266 17.963 7.9627 17.4841 7.9627 16.6987L7.9627 7.3013C7.9627 6.5159 8.8266 6.037 9.4927 6.4533Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
