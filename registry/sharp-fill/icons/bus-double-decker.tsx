import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BusDoubleDecker({ size = 24, ...props }: IconProps) {
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
      <path d="M15 21L9 21L9 22C9 22.5523 8.5523 23 8 23L4 23C3.4477 23 3 22.5523 3 22L3 20L3 13L1 13L1 11L3 11L3 2C3 1.4477 3.4477 1 4 1L20 1C20.5523 1 21 1.4477 21 2L21 11L23 11L23 13L21 13L21 20L21 22C21 22.5523 20.5523 23 20 23L16 23C15.4477 23 15 22.5523 15 22ZM5 7L5 11L11 11L11 7ZM13 7L13 11L19 11L19 7ZM9 16C9 15.4477 8.5523 15 8 15C7.4477 15 7 15.4477 7 16C7 16.5523 7.4477 17 8 17C8.5523 17 9 16.5523 9 16ZM17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17C16.5523 17 17 16.5523 17 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
