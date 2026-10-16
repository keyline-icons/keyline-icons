import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessagesSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M14 9L19 9C20.6569 9 22 10.3431 22 12L22 21C22 21.5523 21.5523 22 21 22C20.7348 22 20.4804 21.8946 20.2929 21.7071L17.5858 19L14 19C12.3431 19 11 17.6569 11 16L11 12C11 10.3431 12.3431 9 14 9Z" fill="currentColor" stroke="none"/>
      <path d="M6 13L3 16L3 5C3 3.8954 3.8954 3 5 3L14 3C15.1046 3 16 3.8954 16 5L16 6" strokeOpacity="0.4"/>
    </svg>
  )
}
