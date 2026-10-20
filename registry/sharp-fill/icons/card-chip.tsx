import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CardChip({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 4C1 3.4477 1.4477 3 2 3ZM16 16L21 16L21 14L16 14L16 10L21 10L21 8L16 8L16 5L14 5L14 19L16 19L16 16ZM8 14L3 14L3 16L8 16L8 19L10 19L10 5L8 5L8 8L3 8L3 10L8 10L8 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
