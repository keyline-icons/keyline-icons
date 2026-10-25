import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TramFront({ size = 24, ...props }: IconProps) {
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
      <path d="M4 5L20 5C20.5523 5 21 5.4477 21 6L21 20C21 20.5523 20.5523 21 20 21L4 21C3.4477 21 3 20.5523 3 20L3 6C3 5.4477 3.4477 5 4 5ZM5 7L5 11L19 11L19 7L5 7ZM9 16C9 15.4477 8.5523 15 8 15C7.4477 15 7 15.4477 7 16C7 16.5523 7.4477 17 8 17C8.5523 17 9 16.5523 9 16ZM17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17C16.5523 17 17 16.5523 17 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M7 2L17 2M10 6L12 2L14 6M8 20L6.7236 22.5528M16 20L17.2764 22.5528" fill="none"/>
    </svg>
  )
}
