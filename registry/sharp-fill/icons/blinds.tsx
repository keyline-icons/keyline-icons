import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Blinds({ size = 24, ...props }: IconProps) {
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
      <path d="M21 3.0001L21 14C21 14.5523 20.5523 15 20 15L4 15C3.4477 15 3 14.5523 3 14L3 3.0001L1 3.0001L1 1.0001L3.988 1.0001C3.992 1 3.996 1 4 1L20 1C20.004 1 20.008 1 20.012 1.0001L23 1.0001L23 3.0001L21 3.0001ZM7 5L7 7L17 7L17 5L7 5ZM7 9L7 11L17 11L17 9L7 9ZM15 20C15 21.6569 13.6569 23 12 23C10.3431 23 9 21.6569 9 20C9 18.3431 10.3431 17 12 17C13.6569 17 15 18.3431 15 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 14L12 18" fill="none"/>
    </svg>
  )
}
