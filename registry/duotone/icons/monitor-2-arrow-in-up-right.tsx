import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2ArrowInUpRight({ size = 24, ...props }: IconProps) {
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
      <path d="M11 18L5 18C2.7908 18 1 16.2092 1 14L1 6C1 3.7908 2.7908 2 5 2L13 2.0001L12.0001 2.0001C12.5493 2.0001 12.9957 2.443 13 2.9922L13 10C13 11.1046 13.8954 12 15 12L23 12.0001L22.012 12.0001C22.5565 12.0066 22.9957 12.4477 23 12.9922L23 14C23 16.2092 21.2092 18 19 18L13 18L13 20L16 20C16.5523 20 17 20.4477 17 21C17 21.5523 16.5523 22 16 22L8 22C7.4477 22 7 21.5523 7 21C7 20.4477 7.4477 20 8 20L11 20L11 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 3L21.4994 3C21.7756 3 22 3.2239 22 3.5L22 9M17 8L21.5 3.5" fill="none"/>
    </svg>
  )
}
