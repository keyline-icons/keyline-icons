import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUTurnUpLine({ size = 24, ...props }: IconProps) {
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
      <path d="M5 10L5 12C5 14.7614 7.2386 17 10 17C12.7614 17 15 14.7614 15 12L15 4M19 8L15.3904 3.1877C15.1903 2.9375 14.8097 2.9375 14.6096 3.1877L11 8M20 21L4 21" fill="none"/>
    </svg>
  )
}
