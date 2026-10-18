import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUTurnUpLineFlip({ size = 24, ...props }: IconProps) {
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
      <path d="M19 10L19 12C19 14.7614 16.7614 17 14 17C11.2386 17 9 14.7614 9 12L9 4M5 8L8.6096 3.1877C8.8097 2.9375 9.1903 2.9375 9.3904 3.1877L13 8M4 21L20 21" fill="none"/>
    </svg>
  )
}
