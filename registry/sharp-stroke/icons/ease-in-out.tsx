import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EaseInOut({ size = 24, ...props }: IconProps) {
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
      <path d="M2.5 20.5H3.5C12 20.5 12 3.5 20.5 3.5H21.5"/>
      <path d="M5 3.5C5 4.329 4.329 5 3.5 5C2.672 5 2 4.329 2 3.5C2 2.672 2.672 2 3.5 2C4.329 2 5 2.672 5 3.5ZM10 3.5C10 4.329 9.328 5 8.5 5C7.672 5 7 4.329 7 3.5C7 2.672 7.672 2 8.5 2C9.328 2 10 2.672 10 3.5ZM17 20.5C17 21.329 16.328 22 15.5 22C14.672 22 14 21.329 14 20.5C14 19.671 14.672 19 15.5 19C16.328 19 17 19.671 17 20.5ZM22 20.5C22 21.329 21.329 22 20.5 22C19.671 22 19 21.329 19 20.5C19 19.671 19.671 19 20.5 19C21.329 19 22 19.671 22 20.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
