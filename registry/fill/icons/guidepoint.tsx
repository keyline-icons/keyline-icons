import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Guidepoint({ size = 24, ...props }: IconProps) {
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
      <path d="M19 8C21.209 8 23 9.79 23 12C23 14.21 21.209 16 19 16C17.253 16 15.7403 14.79 15.1953 13.23C15.1699 13.15 15.0658 13 14.9775 13H9.0205C8.9543 13 8.8942 13.03 8.8574 13.08L8.8291 13.14C8.3367 14.79 6.811 16 5 16C2.7909 16 1 14.21 1 12C1 9.79 2.7909 8 5 8C6.638 8 8.0463 8.98 8.665 10.39L8.7812 10.69C8.8067 10.78 8.9342 11 9.0225 11H14.9775C15.066 11 15.1437 10.94 15.1689 10.86C15.6613 9.2 17.189 8 19 8Z" fill="currentColor"/>
    </svg>
  )
}
