import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function InputCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M20 7L4 7C2.8954 7 2 7.8954 2 9L2 15C2 16.1046 2.8954 17 4 17L12 17M6 11L6 13" fill="none"/>
      <path d="M16.8199 17.1405L15.0585 11.608C15.0201 11.4871 15.0005 11.361 15.0005 11.2342C15.0005 10.5527 15.553 10.0002 16.2345 10.0002C16.3671 10.0002 16.4989 10.0216 16.6248 10.0636L22.1558 11.9051C22.6599 12.0727 23 12.5442 23 13.0754C23 13.5742 22.6996 14.0238 22.2389 14.2148L20.1495 15.0816L19.1136 17.2904C18.9101 17.7235 18.4747 18 17.9962 18C17.4589 18 16.9832 17.6524 16.8199 17.1405Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
