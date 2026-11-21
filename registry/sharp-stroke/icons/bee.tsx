import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bee({ size = 24, ...props }: IconProps) {
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
      <path d="M11 7C6.5817 7 3 10.5817 3 15L3 16C3 16.5523 3.4477 17 4 17C8.4183 17 12 13.4183 12 9L12 8C12 7.4477 11.5523 7 11 7ZM13 7C17.4183 7 21 10.5817 21 15L21 16C21 16.5523 20.5523 17 20 17C15.5817 17 12 13.4183 12 9L12 8C12 7.4477 12.4477 7 13 7ZM15 6C15 4.3431 13.6569 3 12 3C10.3431 3 9 4.3431 9 6C9 6.5523 9.4477 7 10 7L14 7C14.5523 7 15 6.5523 15 6ZM9.8787 3.8787L9.5 3.5L8 2L7.7071 1.7071M14.1213 3.8787L14.5 3.5L16 2L16.2929 1.7071M7.4245 16.2358L7.5 16.5C7.8333 17.6667 9.2 20.4 12 22C14.8 20.4 16.1667 17.6667 16.5 16.5L16.5755 16.2358" fill="none"/>
    </svg>
  )
}
