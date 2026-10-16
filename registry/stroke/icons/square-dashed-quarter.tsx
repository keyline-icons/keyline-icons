import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareDashedQuarter({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6C3 4.34315 4.34315 3 6 3M10.5 3H13.5M18 3C19.6569 3 21 4.34315 21 6M21 10.5V13.5M21 18C21 19.6569 19.6569 21 18 21M13.5 21H10.5M6 21C4.34315 21 3 19.6569 3 18M3 13.5V10.5"/>
      <path d="M12 7H15.5C16.3284 7 17 7.67157 17 8.5V12H12V7Z"/>
    </svg>
  )
}
