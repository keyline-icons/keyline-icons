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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M15.4492 13C15.9987 13 16.4905 13.28 16.7686 13.71C17.052 14.16 17.0999 14.76 16.7744 15.28C16.7667 15.29 16.7583 15.31 16.75 15.32L13.2988 20.31C12.6905 21.23 11.3088 21.23 10.7007 20.31L7.25 15.32C7.2417 15.31 7.2343 15.29 7.2266 15.28C6.9007 14.76 6.9479 14.16 7.2314 13.71C7.5095 13.28 8.0013 13 8.5508 13H15.4492ZM19 3C21.2091 3 23 4.79 23 7C23 9.21 21.2091 11 19 11C17.1362 11 15.57 9.73 15.126 8H8.874C8.43 9.73 6.8638 11 5 11C2.7909 11 1 9.21 1 7C1 4.79 2.7909 3 5 3C6.8638 3 8.43 4.27 8.874 6H15.126C15.57 4.27 17.1362 3 19 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 7C16 8.66 17.3432 10 19 10C20.6568 10 22 8.66 22 7C22 5.34 20.6568 4 19 4C17.3432 4 16 5.34 16 7ZM16 7H8M8 7C8 5.34 6.6568 4 5 4C3.3432 4 2 5.34 2 7C2 8.66 3.3432 10 5 10C6.6568 10 8 8.66 8 7ZM8.0732 14.75L11.5228 19.75C11.7338 20.08 12.2662 20.08 12.4772 19.75L15.9268 14.75C16.1361 14.42 15.8716 14 15.4496 14H8.5504C8.1284 14 7.8639 14.42 8.0732 14.75Z"/>
    </svg>
  )
}
