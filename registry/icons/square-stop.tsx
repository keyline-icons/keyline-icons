import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareStop({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6C3 4.343146 4.343146 3 6 3L18 3C19.656854 3 21 4.343146 21 6L21 18C21 19.656854 19.656854 21 18 21L6 21C4.343146 21 3 19.656854 3 18ZM9 11C9 9.895431 9.895431 9 11 9L13 9C14.104569 9 15 9.895431 15 11L15 13C15 14.104569 14.104569 15 13 15L11 15C9.895431 15 9 14.104569 9 13Z"/>
    </svg>
  )
}
