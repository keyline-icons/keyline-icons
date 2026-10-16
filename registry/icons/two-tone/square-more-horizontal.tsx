import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareMoreHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 3L18 3C19.6569 3 21 4.3431 21 6L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 6C3 4.3431 4.3431 3 6 3Z"/>
      <path d="M7.3333 10.6667C8.0697 10.6667 8.6666 11.2636 8.6666 12C8.6666 12.7364 8.0697 13.3333 7.3333 13.3333C6.5969 13.3333 6 12.7364 6 12C6 11.2636 6.5969 10.6667 7.3333 10.6667ZM12 10.6667C12.7364 10.6667 13.3333 11.2636 13.3333 12C13.3333 12.7364 12.7364 13.3333 12 13.3333C11.2636 13.3333 10.6667 12.7364 10.6667 12C10.6667 11.2636 11.2636 10.6667 12 10.6667ZM16.6667 10.6667C17.4031 10.6667 18 11.2636 18 12C18 12.7364 17.4031 13.3333 16.6667 13.3333C15.9303 13.3333 15.3334 12.7364 15.3334 12C15.3334 11.2636 15.9303 10.6667 16.6667 10.6667Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
