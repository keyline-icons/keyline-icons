import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bin({ size = 24, ...props }: IconProps) {
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
      <path d="M20 6C20.5523 6 21 6.4477 21 7C21 7.5523 20.5523 8 20 8L19 8L19 19C19 21.2091 17.2091 23 15 23L9 23C6.7909 23 5 21.2091 5 19L5 8L4 8C3.4477 8 3 7.5523 3 7C3 6.4477 3.4477 6 4 6L20 6ZM14 1C14.5523 1 15 1.4477 15 2C15 2.5523 14.5523 3 14 3L10 3C9.4477 3 9 2.5523 9 2C9 1.4477 9.4477 1 10 1L14 1Z" fill="currentColor"/>
    </svg>
  )
}
