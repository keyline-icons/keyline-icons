import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUTurnDownLine({ size = 24, ...props }: IconProps) {
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
      <path d="M5 14L5 12C5 9.2386 7.2386 7 10 7C12.7614 7 15 9.2386 15 12L15 20M19 16L15.3904 20.8123C15.1903 21.0625 14.8097 21.0625 14.6096 20.8123L11 16M20 3L4 3" fill="none"/>
    </svg>
  )
}
