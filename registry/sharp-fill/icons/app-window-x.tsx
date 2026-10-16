import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AppWindowX({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L21 2C21.5523 2 22 2.4477 22 3L22 11C22 11.5523 21.5523 12 21 12L12 12L12 21C12 21.5523 11.5523 22 11 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2ZM8 7C8 6.4477 7.5523 6 7 6C6.4477 6 6 6.4477 6 7C6 7.5523 6.4477 8 7 8C7.5523 8 8 7.5523 8 7ZM12 7C12 6.4477 11.5523 6 11 6C10.4477 6 10 6.4477 10 7C10 7.5523 10.4477 8 11 8C11.5523 8 12 7.5523 12 7ZM16 7C16 6.4477 15.5523 6 15 6C14.4477 6 14 6.4477 14 7C14 7.5523 14.4477 8 15 8C15.5523 8 16 7.5523 16 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M14.7071 14.7071L21.2929 21.2929M21.2929 14.7071L14.7071 21.2929"/>
    </svg>
  )
}
