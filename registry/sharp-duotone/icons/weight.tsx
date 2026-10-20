import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Weight({ size = 24, ...props }: IconProps) {
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
      <path d="M15 6C15 7.6569 13.6569 9 12 9C10.3431 9 9 7.6569 9 6C9 4.3431 10.3431 3 12 3C13.6569 3 15 4.3431 15 6Z" fill="none" strokeOpacity="0.4"/>
      <path d="M7 8L17 8C17.4304 8 17.8126 8.2754 17.9487 8.6838L21.9487 20.6838C21.9827 20.7857 22 20.8925 22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21C2 20.8925 2.0173 20.7857 2.0513 20.6838L6.0513 8.6838C6.1874 8.2754 6.5696 8 7 8Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
