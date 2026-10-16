import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareRecord({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6C3 4.343146 4.343146 3 6 3L18 3C19.656854 3 21 4.343146 21 6L21 18C21 19.656854 19.656854 21 18 21L6 21C4.343146 21 3 19.656854 3 18ZM16 12C16 14.2091 14.2091 16 12 16C9.7909 16 8 14.2091 8 12C8 9.7909 9.7909 8 12 8C14.2091 8 16 9.7909 16 12Z"/>
    </svg>
  )
}
