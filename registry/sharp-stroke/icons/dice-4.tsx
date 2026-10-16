import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Dice4({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L21 3L21 21L3 21L3 3Z"/>
      <path d="M7.25 5.75C8.0784 5.75 8.75 6.4216 8.75 7.25C8.75 8.0784 8.0784 8.75 7.25 8.75C6.4216 8.75 5.75 8.0784 5.75 7.25C5.75 6.4216 6.4216 5.75 7.25 5.75ZM16.75 5.75C17.5784 5.75 18.25 6.4216 18.25 7.25C18.25 8.0784 17.5784 8.75 16.75 8.75C15.9216 8.75 15.25 8.0784 15.25 7.25C15.25 6.4216 15.9216 5.75 16.75 5.75ZM7.25 15.25C8.0784 15.25 8.75 15.9216 8.75 16.75C8.75 17.5784 8.0784 18.25 7.25 18.25C6.4216 18.25 5.75 17.5784 5.75 16.75C5.75 15.9216 6.4216 15.25 7.25 15.25ZM16.75 15.25C17.5784 15.25 18.25 15.9216 18.25 16.75C18.25 17.5784 17.5784 18.25 16.75 18.25C15.9216 18.25 15.25 17.5784 15.25 16.75C15.25 15.9216 15.9216 15.25 16.75 15.25Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
