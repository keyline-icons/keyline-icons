import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WaveSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M2 17L6 17C6.5523 17 7 16.5523 7 16L7 8C7 7.4477 7.4477 7 8 7L11 7C11.5523 7 12 7.4477 12 8L12 16C12 16.5523 12.4477 17 13 17L16 17C16.5523 17 17 16.5523 17 16L17 8C17 7.4477 17.4477 7 18 7L22 7"/>
    </svg>
  )
}
