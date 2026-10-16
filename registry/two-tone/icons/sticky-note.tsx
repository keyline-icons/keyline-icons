import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function StickyNote({ size = 24, ...props }: IconProps) {
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
      <path d="M6 2L15 2C15.2652 2 15.5196 2.1054 15.7071 2.2929L21.7071 8.2929C21.8946 8.4804 22 8.7348 22 9L22 18C22 20.2091 20.2091 22 18 22L6 22C3.7909 22 2 20.2091 2 18L2 6C2 3.7909 3.7909 2 6 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 3L15 3L21 9L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 6C3 4.3431 4.3431 3 6 3ZM15 3L15 6C15 7.6569 16.3431 9 18 9L21 9"/>
    </svg>
  )
}
