import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUTurnLeftLineFlip({ size = 24, ...props }: IconProps) {
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
      <path d="M10 5L12 5C14.7614 5 17 7.2386 17 10C17 12.7614 14.7614 15 12 15L4 15M8 19L3.1877 15.3904C2.9375 15.1903 2.9375 14.8097 3.1877 14.6096L8 11M21 20L21 4" fill="none"/>
    </svg>
  )
}
