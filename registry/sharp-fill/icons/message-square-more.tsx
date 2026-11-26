import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareMore({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L21 2C21.5523 2 22 2.4477 22 3L22 17C22 17.5523 21.5523 18 21 18L7.4142 18L3.7071 21.7071C3.5196 21.8946 3.2652 22 3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2ZM7.3333 8.6667C6.5969 8.6667 6 9.2636 6 10C6 10.7364 6.5969 11.3333 7.3333 11.3333C8.0697 11.3333 8.6666 10.7364 8.6666 10C8.6666 9.2636 8.0697 8.6667 7.3333 8.6667ZM12 8.6667C11.2636 8.6667 10.6667 9.2636 10.6667 10C10.6667 10.7364 11.2636 11.3333 12 11.3333C12.7364 11.3333 13.3333 10.7364 13.3333 10C13.3333 9.2636 12.7364 8.6667 12 8.6667ZM16.6667 8.6667C15.9303 8.6667 15.3334 9.2636 15.3334 10C15.3334 10.7364 15.9303 11.3333 16.6667 11.3333C17.4031 11.3333 18 10.7364 18 10C18 9.2636 17.4031 8.6667 16.6667 8.6667Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
