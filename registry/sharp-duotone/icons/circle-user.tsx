import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleUser({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.063 23 12C23 17.937 17.937 23 12 23C6.063 23 1 17.937 1 12C1 6.063 6.063 1 12 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 6C13.519 6 15 7.481 15 9C15 10.519 13.519 12 12 12C10.481 12 9 10.519 9 9C9 7.481 10.481 6 12 6ZM11 14H13C15.665 14 17.842 16.086 18 18.708C16.35 20.184 14.214 21 12 21C9.786 21 7.65 20.184 6 18.708C6.157 16.086 8.335 14 11 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
