import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Scroll({ size = 24, ...props }: IconProps) {
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
      <path d="M12 22L7 22C6.4477 22 6 21.5523 6 21L6 10L2 10C1.4477 10 1 9.5523 1 9L1 6L1 3C1 2.4477 1.4477 2 2 2L7 2L18 2C18.5523 2 19 2.4477 19 3L19 9.5L19 15L22 15C22.5523 15 23 15.4477 23 16L23 21C23 21.5523 22.5523 22 22 22L17 22ZM3 6L3 8L6 8L6 4L3 4ZM17 20L21 20L21 17L18 17L13 17L13 20ZM10 7L10 9L15 9L15 7ZM10 11L10 13L15 13L15 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
