import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EyeOff({ size = 24, ...props }: IconProps) {
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
      <path d="M5.25 5.25L18.75 18.75C16.8543 20.1721 14.5069 21 12 21C6.7383 21 2.1794 17.3529 1.0244 12.2195C0.9919 12.075 0.9919 11.925 1.0244 11.7805C1.6291 9.0929 3.1668 6.8127 5.25 5.25ZM20.6633 17.1512L7.6419 3.9181C9.0024 3.3275 10.4819 3 12 3C17.2617 3 21.8206 6.6471 22.9756 11.7805C23.0081 11.925 23.0081 12.075 22.9756 12.2195C22.6998 13.4454 22.2298 14.5865 21.6025 15.6135ZM9.1716 9.1716L14.8284 14.8284C14.1046 15.5523 13.1046 16 12 16C9.7909 16 8 14.2091 8 12C8 10.8955 8.4477 9.8955 9.1716 9.1716ZM10.5858 10.5858L13.4142 13.4142C13.0523 13.7762 12.5523 14 12 14C10.8954 14 10 13.1046 10 12C10 11.4477 10.2238 10.9477 10.5858 10.5858Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
