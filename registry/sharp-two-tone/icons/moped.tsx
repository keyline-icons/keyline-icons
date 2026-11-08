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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18 4C18.477 4 18.887 4.34 18.98 4.8L19.861 9.21C20.052 10.16 19.318 10.95 18.467 11.02C16.774 11.15 15.707 11.91 15.032 12.8C14.333 13.72 14.04 14.8 13.992 15.51C13.943 16.24 13.357 17 12.441 17H9.964C9.721 18.7 8.263 20 6.5 20C4.737 20 3.279 18.7 3.036 17H1V15H2V10C2 9.45 2.448 9 3 9H10C10.552 9 11 9.45 11 10V15H12.036C12.169 14 12.583 12.72 13.439 11.59C14.357 10.38 15.769 9.37 17.796 9.08L17.181 6H14V4H18ZM19.5 13C21.433 13 23 14.57 23 16.5C23 18.43 21.433 20 19.5 20C17.567 20 16 18.43 16 16.5C16 14.57 17.567 13 19.5 13ZM11 7H5V5H11V7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 16H12.441C12.739 16 12.974 15.74 12.994 15.44C13.112 13.7 14.391 10.34 18.388 10.02C18.703 10 18.942 9.71 18.88 9.4L18 5H14M3 16V10H10V13V16M11 6H5M4 16V16.5C4 17.88 5.119 19 6.5 19C7.881 19 9 17.88 9 16.5V16M19.5 19C18.119 19 17 17.88 17 16.5C17 15.12 18.119 14 19.5 14C20.881 14 22 15.12 22 16.5C22 17.88 20.881 19 19.5 19Z"/>
    </svg>
  )
}
