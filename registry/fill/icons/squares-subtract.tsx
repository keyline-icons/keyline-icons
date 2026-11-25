import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquaresSubtract({ size = 24, ...props }: IconProps) {
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
      <path d="M9 2L13 2C14.6569 2 16 3.3431 16 5L16 7C16 8.6569 14.6569 10 13 10L10 10L10 13C10 14.6569 8.6569 16 7 16L5 16C3.3431 16 2 14.6569 2 13L2 5C2 3.3431 3.3431 2 5 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19 9C20.1046 9 21 9.8954 21 11L21 12.5M21 17.5L21 19C21 20.1046 20.1046 21 19 21L17.5 21M12.5 21L11 21C9.8954 21 9 20.1046 9 19"/>
    </svg>
  )
}
