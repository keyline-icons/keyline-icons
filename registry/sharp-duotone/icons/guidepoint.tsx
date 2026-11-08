import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Guidepoint({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 8C7.209 8 9 9.79 9 12C9 14.21 7.209 16 5 16C2.791 16 1 14.21 1 12C1 9.79 2.791 8 5 8ZM19 8C21.209 8 23 9.79 23 12C23 14.21 21.209 16 19 16C16.791 16 15 14.21 15 12C15 9.79 16.791 8 19 8Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M16 11V13H8V11H16Z" fill="currentColor"/>
    </svg>
  )
}
