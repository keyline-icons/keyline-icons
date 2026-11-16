import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CurtainsOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M22 4H21V21C21 21.552 20.552 22 20 22H16C15.448 22 15 21.552 15 21C15 18.473 16.666 16.478 18.378 15.016C16.972 13.859 15.74 12.487 14.811 10.793C13.782 8.917 13.15 6.69 13.024 4H10.976C10.85 6.69 10.218 8.917 9.189 10.793C8.26 12.487 7.028 13.859 5.621 15.016C7.334 16.479 9 18.473 9 21C9 21.552 8.552 22 8 22H4C3.448 22 3 21.552 3 21V4H2V2H22V4Z" fill="currentColor"/>
    </svg>
  )
}
