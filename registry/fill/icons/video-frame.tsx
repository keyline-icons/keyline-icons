import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VideoFrame({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8V6C3 4.343 4.3432 3 6 3H8M16 3H18C19.6569 3 21 4.343 21 6V8M8 21H6C4.3432 21 3 19.657 3 18V16M18 15V21M21 18L18 21L15 18"/>
      <path d="M12.6774 8.069L15.3322 9.728C15.8015 10.021 16.0372 10.517 16.0372 11C16.0372 11.483 15.8015 11.979 15.3322 12.272L10.0226 15.59C9.3575 16.006 8.585 15.972 7.9931 15.644C7.4012 15.316 6.9626 14.679 6.9626 13.894V8.105C6.9626 7.321 7.4012 6.684 7.9931 6.356C8.585 6.028 9.3575 5.994 10.0226 6.409L12.6774 8.069Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
