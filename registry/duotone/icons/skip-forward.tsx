import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SkipForward({ size = 24, ...props }: IconProps) {
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
      <path d="M4 7.0059C4 4.403702 7.08633 3.035512 9.014539 4.782922L15.343026 10.518015C16.218991 11.311844 16.218991 12.688156 15.343026 13.481985L9.014539 19.217078C7.08633 20.964488 4 19.596298 4 16.9941Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 5L19 19"/>
    </svg>
  )
}
