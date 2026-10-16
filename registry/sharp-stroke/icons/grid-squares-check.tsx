import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GridSquaresCheck({ size = 24, ...props }: IconProps) {
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
      <path d="M3 14L10 14L10 21L3 21L3 14ZM3 3L10 3L10 10L3 10L3 3ZM14 3L21 3L21 10L14 10L14 3ZM13.7035 17.1823L16.3333 20L21.2689 14.7118"/>
    </svg>
  )
}
