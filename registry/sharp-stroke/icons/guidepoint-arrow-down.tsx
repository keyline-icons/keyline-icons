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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16 7C16 8.66 17.343 10 19 10C20.657 10 22 8.66 22 7C22 5.34 20.657 4 19 4C17.343 4 16 5.34 16 7ZM16 7H8M8 7C8 5.34 6.657 4 5 4C3.343 4 2 5.34 2 7C2 8.66 3.343 10 5 10C6.657 10 8 8.66 8 7ZM7.513 14L12 20L16.487 14H7.513Z"/>
    </svg>
  )
}
