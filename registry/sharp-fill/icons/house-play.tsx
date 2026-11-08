import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HousePlay({ size = 24, ...props }: IconProps) {
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
      <path d="M11.46 2.13C11.801 1.95 12.297 1.94 12.612 2.18L20.637 8.37L23 10.37L21.708 11.9L21.199 11.46L21.001 11.3V21C21.001 21.55 20.553 22 20.001 22H4.001C3.449 22 3.002 21.55 3.001 21V11.3L2.294 11.9L1 10.37L3.273 8.44L11.46 2.13ZM10.053 8.43C9.747 8.23 9.352 8.21 9.028 8.38C8.704 8.56 8.502 8.9 8.501 9.26V17.72C8.502 18.08 8.767 18.46 9.091 18.63C9.388 18.74 9.785 18.73 10.053 18.55L16.429 14.32C16.708 14.14 16.877 13.82 16.877 13.49C16.877 13.15 16.708 12.84 16.429 12.65L10.053 8.43Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
