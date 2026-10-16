import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Gift({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6L22 6C22.5523 6 23 6.4477 23 7L23 10C23 11.1046 22.1046 12 21 12L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 12C1.8954 12 1 11.1046 1 10L1 7C1 6.4477 1.4477 6 2 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 10L23 10C23 11.1046 22.1046 12 21 12L3 12C1.8954 12 1 11.1046 1 10Z" fill="currentColor" stroke="none"/>
      <path d="M12 7C9 7 7 6 7 4.5C7 3.1193 8.1193 2 9.5 2C11.5 2 12 5 12 7ZM12 7C15 7 17 6 17 4.5C17 3.1193 15.8807 2 14.5 2C12.5 2 12 5 12 7Z"/>
    </svg>
  )
}
