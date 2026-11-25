import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SeparatorHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L17 2C18.6569 2 20 3.3431 20 5L20 6C20 7.6569 18.6569 9 17 9L7 9C5.3431 9 4 7.6569 4 6L4 5C4 3.3431 5.3431 2 7 2ZM12 15L17 15C18.6569 15 20 16.3431 20 18L20 19C20 20.6569 18.6569 22 17 22L7 22C5.3431 22 4 20.6569 4 19L4 18C4 16.3431 5.3431 15 7 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 12H21"/>
    </svg>
  )
}
