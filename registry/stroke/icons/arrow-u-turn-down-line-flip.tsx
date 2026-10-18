import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUTurnDownLineFlip({ size = 24, ...props }: IconProps) {
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
      <path d="M19 14L19 12C19 9.2386 16.7614 7 14 7C11.2386 7 9 9.2386 9 12L9 20M5 16L8.6096 20.8123C8.8097 21.0625 9.1903 21.0625 9.3904 20.8123L13 16M4 3L20 3" fill="none"/>
    </svg>
  )
}
