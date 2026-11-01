import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Breakfast({ size = 24, ...props }: IconProps) {
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
      <path d="M5 13.3627L5 10C5 9.4477 5.4477 9 6 9L18 9C18.5523 9 19 9.4477 19 10L19 12L22 12C22.5523 12 23 12.4477 23 13L23 19C23 19.5523 22.5523 20 22 20L19 20L19 22C19 22.5523 18.5523 23 18 23L16.8293 23C16.9426 22.6788 17.0004 22.3406 17 22L17 21.4545C17.0001 17.9227 14.8053 14.7628 11.4956 13.5298C10.5517 13.1787 9.5526 12.9993 8.5455 13L7.4546 13C6.623 12.9995 5.7959 13.1217 5 13.3627ZM8.5455 15C11.2419 14.9999 13.6545 16.6755 14.5959 19.2023C14.8639 19.9229 15.0007 20.6857 15 21.4545L15 22C15 22.5523 14.5523 23 14 23L2 23C1.4477 23 1 22.5523 1 22L1 21.4545C0.9999 18.758 2.6756 16.3455 5.2023 15.4041C5.923 15.1361 6.6858 14.9993 7.4546 15L8.5455 15ZM9 17.0228C8.849 17.0076 8.6973 17 8.5455 17L7.4546 17C7.3028 17 7.1511 17.0076 7 17.0228L7 21L9 21L9 17.0228Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10.5 7L10.5 6C10.5 5.2131 10.8705 4.4721 11.5 4C12.1295 3.5279 12.5 2.7869 12.5 2L12.5 1M15.5 7L15.5 6C15.5 5.2131 15.8705 4.4721 16.5 4C17.1295 3.5279 17.5 2.7869 17.5 2L17.5 1" fill="none"/>
    </svg>
  )
}
