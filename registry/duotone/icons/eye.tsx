import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Eye({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1.0244 11.7805C2.1794 6.6471 6.7383 3 12 3C17.2617 3 21.8206 6.6471 22.9756 11.7805C23.0081 11.925 23.0081 12.075 22.9756 12.2195C21.8206 17.3529 17.2617 21 12 21C6.7383 21 2.1794 17.3529 1.0244 12.2195C0.9919 12.075 0.9919 11.925 1.0244 11.7805Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"/>
    </svg>
  )
}
