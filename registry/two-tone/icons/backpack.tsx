import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Backpack({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C14.2092 1 16 2.875 16 5.084C18.8376 5.56 21 8.027 21 11V19C21 21.209 19.2092 23 17 23H7C4.7909 23 3 21.209 3 19V11C3 8.027 5.1624 5.56 8 5.084C8 2.875 9.7908 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 6C17.7614 6 20 8.239 20 11V19C20 20.657 18.6569 22 17 22H7C5.3432 22 4 20.657 4 19V11C4 8.239 6.2386 6 9 6M15 6H9M15 6V5C15 3.343 13.6569 2 12 2C10.3431 2 9 3.343 9 5V6M4 15H20M10 10H14M8 15V18"/>
    </svg>
  )
}
