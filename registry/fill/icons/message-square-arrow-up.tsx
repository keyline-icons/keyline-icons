import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M6 2L18 2C20.2091 2 22 3.7909 22 6L22 14C22 16.2091 20.2091 18 18 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21L2 6C2 3.7909 3.7909 2 6 2ZM11 9.4142L11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13L13 9.4142L14.2929 10.7071C14.6834 11.0976 15.3166 11.0976 15.7071 10.7071C16.0976 10.3166 16.0976 9.6834 15.7071 9.2929L12.7071 6.2929C12.3166 5.9024 11.6834 5.9024 11.2929 6.2929L8.2929 9.2929C7.9024 9.6834 7.9024 10.3166 8.2929 10.7071C8.6834 11.0976 9.3166 11.0976 9.7071 10.7071Z" fill="currentColor"/>
    </svg>
  )
}
