import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandCoins({ size = 24, ...props }: IconProps) {
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
      <path d="M3 16.3L6.9326 12.7441C8.0716 11.7143 9.6664 11.35 11.171 11.6582L13.255 12.085L14.17 11.17C14.9511 10.389 16.219 10.389 17 11.17C17.7811 11.9511 17.7811 13.219 17 14L13 18C12.4 18.6 11.5 19 10.5 19L5.8284 19C5.2985 19 4.7892 19.2108 4.4142 19.5858L3 21ZM22 4.5C22 6.433 20.433 8 18.5 8C16.567 8 15 6.433 15 4.5C15 2.567 16.567 1 18.5 1C20.433 1 22 2.567 22 4.5ZM9.5 5.5C9.5 7.433 7.933 9 6 9C4.067 9 2.5 7.433 2.5 5.5C2.5 3.567 4.067 2 6 2C7.933 2 9.5 3.567 9.5 5.5Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M21 4.5C21 5.8807 19.8807 7 18.5 7C17.1193 7 16 5.8807 16 4.5C16 3.1193 17.1193 2 18.5 2C19.8807 2 21 3.1193 21 4.5ZM8.5 5.5C8.5 6.8807 7.3807 8 6 8C4.6193 8 3.5 6.8807 3.5 5.5C3.5 4.1193 4.6193 3 6 3C7.3807 3 8.5 4.1193 8.5 5.5ZM3 14L3 22M3 16.3L6.9326 12.7441C8.0716 11.7143 9.6664 11.35 11.171 11.6582L13.255 12.085M11.17 14.17L14.17 11.17C14.9511 10.389 16.219 10.389 17 11.17C17.7811 11.9511 17.7811 13.219 17 14L13 18C12.4 18.6 11.5 19 10.5 19L5.8284 19C5.2985 19 4.7892 19.2108 4.4142 19.5858L3 21" fill="none"/>
    </svg>
  )
}
