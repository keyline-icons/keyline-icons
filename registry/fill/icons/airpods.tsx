import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Airpods({ size = 24, ...props }: IconProps) {
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
      <path d="M7 2L17 2C20.3137 2 23 4.6863 23 8L23 16C23 19.3137 20.3137 22 17 22L7 22C3.6863 22 1 19.3137 1 16L1 8C1 4.6863 3.6863 2 7 2ZM3 8L3 10L7.2679 10C7.6252 10.6188 8.2855 11 9 11L15 11C15.7145 11 16.3748 10.6188 16.7321 10L21 10L21 8L16.7321 8C16.3748 7.3812 15.7145 7 15 7L9 7C8.2855 7 7.6252 7.3812 7.2679 8L3 8ZM13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14Z" fill="currentColor"/>
    </svg>
  )
}
