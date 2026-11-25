import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquaresIntersect({ size = 24, ...props }: IconProps) {
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
      <path d="M11 9L13 9C14.1046 9 15 9.8954 15 11L15 13C15 14.1046 14.1046 15 13 15L11 15C9.8954 15 9 14.1046 9 13L9 11C9 9.8954 9.8954 9 11 9ZM5 15C3.8954 15 3 14.1046 3 13L3 11.5M3 6.5L3 5C3 3.8954 3.8954 3 5 3L6.5 3M11.5 3L13 3C14.1046 3 15 3.8954 15 5M19 9C20.1046 9 21 9.8954 21 11L21 12.5M21 17.5L21 19C21 20.1046 20.1046 21 19 21L17.5 21M12.5 21L11 21C9.8954 21 9 20.1046 9 19"/>
    </svg>
  )
}
