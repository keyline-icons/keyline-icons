import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClipboardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.6465 20.6465C20.0188 22.0343 18.6222 23 17 23H7C4.7909 23 3 21.2091 3 19V7C3.0001 5.9083 3.4415 4.9021 4.1714 4.1714L20.6465 20.6465ZM19.2929 15.0503L7.2456 3.0029C7.0646 2.822 6.9527 2.572 6.9527 2.2958C6.9527 1.9464 7.1319 1.6389 7.4032 1.4601C7.8705 1.1664 8.4205 1.0001 9 1H15C16.3075 1.0001 17.4646 1.8466 17.8604 3.0928C19.694 3.4972 20.9998 5.1223 21 7V14.3431C21 14.8954 20.5523 15.3431 20 15.3431C19.7239 15.3431 19.4739 15.2312 19.2929 15.0503Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.8787 4.8787C4.3358 5.4215 4 6.1715 4 7V19C4 20.6569 5.3431 22 7 22H17C18.3538 22 19.4981 21.1033 19.8715 19.8715M2 2L22 22"/>
    </svg>
  )
}
