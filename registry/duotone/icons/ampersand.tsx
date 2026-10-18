import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ampersand({ size = 24, ...props }: IconProps) {
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
      <path d="M17 12C17 16.9706 12.9706 21 8 21C5.7909 21 4 19.2091 4 17C4 15.923 4.4343 14.8914 5.2048 14.1388L11.3391 8.1459C11.9169 7.5814 12.2426 6.8078 12.2426 6C12.2426 4.3431 10.8995 3 9.2426 3C7.5858 3 6.2426 4.3431 6.2426 6C6.2426 6.7956 6.5587 7.5587 7.1213 8.1213L20 21" fill="none"/>
    </svg>
  )
}
