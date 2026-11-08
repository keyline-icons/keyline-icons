import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Moped({ size = 24, ...props }: IconProps) {
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
      <path d="M18 4C18.476 4 18.887 4.34 18.98 4.8L19.861 9.21C20.052 10.16 19.318 10.95 18.467 11.02C16.775 11.15 15.707 11.91 15.032 12.8C14.42 13.61 14.12 14.54 14.022 15.23L13.979 15.64C13.882 16.28 13.288 16.92 12.521 17H9.964C9.68 18.65 8.228 20 6.5 20C4.772 20 3.32 18.65 3.036 17H1V15H2V10C2 9.45 2.448 9 3 9H10C10.552 9 11 9.45 11 10V15H12.038C12.186 14.02 12.612 12.68 13.439 11.59C14.338 10.41 15.836 9.4 17.795 9.08L17.181 6H14V4H18Z" fill="currentColor"/>
      <path d="M19.5 13C21.433 13 23 14.57 23 16.5C23 18.43 21.433 20 19.5 20C17.567 20 16 18.43 16 16.5C16 14.57 17.567 13 19.5 13ZM11 5V7H5V5H11Z" fill="currentColor"/>
    </svg>
  )
}
