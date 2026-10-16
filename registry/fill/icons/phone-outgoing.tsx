import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PhoneOutgoing({ size = 24, ...props }: IconProps) {
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
      <path d="M1 4C1 2.3431 2.3431 1 4 1L7 1C8.6569 1 10 2.3431 10 4L10 7C10 7.9443 9.5554 8.8334 8.8 9.4L8.3388 9.7459C9.6049 12.3156 11.6844 14.3951 14.2541 15.6612L14.6 15.2C15.1666 14.4446 16.0557 14 17 14L20 14C21.6569 14 23 15.3431 23 17L23 20C23 21.6569 21.6569 23 20 23C9.5066 23 1 14.4934 1 4Z" fill="currentColor" stroke="none"/>
      <path d="M21.5 2.5L17 7M22 8V2.5C22 2.2239 21.7761 2 21.5 2H16"/>
    </svg>
  )
}
