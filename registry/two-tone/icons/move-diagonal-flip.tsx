import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MoveDiagonalFlip({ size = 24, ...props }: IconProps) {
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
      <path d="M4.6 4.6L19.4 19.4M20 14L20 19.5C20 19.7761 19.7761 20 19.5 20L14 20M4 10L4 4.5C4 4.2239 4.2239 4 4.5 4L10 4" fill="none"/>
    </svg>
  )
}
