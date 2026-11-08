import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DropletDegree({ size = 24, ...props }: IconProps) {
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
      <path d="M9 2C9.6295 2 10.2219 2.3 10.5996 2.8L15.4004 9.2C16.4389 10.58 17 12.27 17 14C17 18.42 13.4183 22 9 22C4.5817 22 1 18.42 1 14C1 12.27 1.5611 10.58 2.5996 9.2L7.4004 2.8C7.7781 2.3 8.3705 2 9 2Z" fill="currentColor"/>
      <path d="M20 2C21.657 2 23 3.34 23 5C23 6.66 21.657 8 20 8C18.3431 8 17 6.66 17 5C17 3.34 18.3431 2 20 2ZM20 4C19.4477 4 19 4.45 19 5C19 5.55 19.4477 6 20 6C20.5523 6 21 5.55 21 5C21 4.45 20.5523 4 20 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
