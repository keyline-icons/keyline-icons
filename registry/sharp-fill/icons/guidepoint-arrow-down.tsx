import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointArrowDown({ size = 24, ...props }: IconProps) {
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
      <path d="M16.486 13C16.865 13 17.211 13.21 17.381 13.55C17.55 13.89 17.513 14.3 17.287 14.6L12.801 20.6C12.636 20.82 12.322 20.97 12.052 21C11.737 21 11.388 20.85 11.199 20.6L6.709 14.6C6.516 14.33 6.508 13.85 6.61 13.55C6.795 13.28 7.182 13 7.513 13H16.486ZM19 3C21.209 3 23 4.79 23 7C23 9.21 21.209 11 19 11C17.362 11 15.954 10.01 15.336 8.6L15.223 8.32L15.127 8H8.872C8.398 9.68 6.831 11 5 11C2.791 11 1 9.21 1 7C1 4.79 2.791 3 5 3C6.831 3 8.398 4.32 8.872 6H15.128C15.602 4.32 17.169 3 19 3Z" fill="currentColor"/>
    </svg>
  )
}
