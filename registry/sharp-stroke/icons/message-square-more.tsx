import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareMore({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3H21V17H7L3 21V3Z"/>
      <path d="M7.333 8.667C8.07 8.667 8.667 9.264 8.667 10C8.667 10.736 8.07 11.333 7.333 11.333C6.597 11.333 6 10.736 6 10C6 9.264 6.597 8.667 7.333 8.667ZM12 8.667C12.736 8.667 13.333 9.264 13.333 10C13.333 10.736 12.736 11.333 12 11.333C11.264 11.333 10.667 10.736 10.667 10C10.667 9.264 11.264 8.667 12 8.667ZM16.667 8.667C17.403 8.667 18 9.264 18 10C18 10.736 17.403 11.333 16.667 11.333C15.93 11.333 15.333 10.736 15.333 10C15.333 9.264 15.93 8.667 16.667 8.667Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
