import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUTurnLeftLine({ size = 24, ...props }: IconProps) {
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
      <path d="M10 19L12 19C14.7614 19 17 16.7614 17 14C17 11.2386 14.7614 9 12 9L4 9M8 5L3.1877 8.6096C2.9375 8.8097 2.9375 9.1903 3.1877 9.3904L8 13M21 4L21 20" fill="none"/>
    </svg>
  )
}
