import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserChild({ size = 24, ...props }: IconProps) {
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
      <path d="M10.1008 21H3C2.4477 21 2 20.5523 2 20L2 19C2 15.6863 4.6863 13 8 13H10C10.8947 13 11.7781 13.2001 12.5854 13.5856M9 3C10.6569 3 12 4.3431 12 6C12 7.6569 10.6569 9 9 9C7.3432 9 6 7.6569 6 6C6 4.3431 7.3432 3 9 3ZM17 17H19C20.6569 17 22 18.3431 22 20C22 20.5523 21.5523 21 21 21H15C14.4477 21 14 20.5523 14 20C14 18.3431 15.3431 17 17 17ZM20 11C20 12.1046 19.1046 13 18 13C16.8954 13 16 12.1046 16 11C16 9.8954 16.8954 9 18 9C19.1046 9 20 9.8954 20 11Z"/>
    </svg>
  )
}
