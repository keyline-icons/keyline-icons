import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2ArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M11 18L5 18C2.7908 18 1 16.2092 1 14L1 6C1 3.7908 2.7908 2 5 2L19 2C21.2092 2 23 3.7908 23 6L23 14C23 16.2092 21.2092 18 19 18L13 18L13 20L16 20C16.5523 20 17 20.4477 17 21C17 21.5523 16.5523 22 16 22L8 22C7.4477 22 7 21.5523 7 21C7 20.4477 7.4477 20 8 20L11 20L11 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 13L12 7M9 10L12 7L15 10" fill="none"/>
    </svg>
  )
}
