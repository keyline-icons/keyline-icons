import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pizza({ size = 24, ...props }: IconProps) {
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
      <path d="M2 22L5.296 2C13.8435 3.4612 20.5388 10.1565 22 18.704ZM4.6456 5.9469C11.5014 7.1291 16.8709 12.4986 18.0531 19.3544" fill="none"/>
      <path d="M8.8317 16.6683C8.8317 17.4967 8.1601 18.1683 7.3317 18.1683C6.5033 18.1683 5.8317 17.4967 5.8317 16.6683C5.8317 15.8399 6.5033 15.1683 7.3317 15.1683C8.1601 15.1683 8.8317 15.8399 8.8317 16.6683ZM9.6095 11.86C9.6095 12.6884 8.938 13.36 8.1095 13.36C7.2811 13.36 6.6095 12.6884 6.6095 11.86C6.6095 11.0315 7.2811 10.36 8.1095 10.36C8.938 10.36 9.6095 11.0315 9.6095 11.86ZM13.64 15.8905C13.64 16.7189 12.9685 17.3905 12.14 17.3905C11.3116 17.3905 10.64 16.7189 10.64 15.8905C10.64 15.062 11.3116 14.3905 12.14 14.3905C12.9685 14.3905 13.64 15.062 13.64 15.8905Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
