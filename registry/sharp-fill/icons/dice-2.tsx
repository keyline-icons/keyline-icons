import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Dice2({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L21 2C21.5523 2 22 2.4477 22 3L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2ZM7.25 5.75C8.0784 5.75 8.75 6.4216 8.75 7.25C8.75 8.0784 8.0784 8.75 7.25 8.75C6.4216 8.75 5.75 8.0784 5.75 7.25C5.75 6.4216 6.4216 5.75 7.25 5.75ZM16.75 15.25C17.5784 15.25 18.25 15.9216 18.25 16.75C18.25 17.5784 17.5784 18.25 16.75 18.25C15.9216 18.25 15.25 17.5784 15.25 16.75C15.25 15.9216 15.9216 15.25 16.75 15.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
