import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Podium1({ size = 24, ...props }: IconProps) {
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
      <path d="M4 22V18.5H9V15H14V11.5H20V22H4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 22H22M4 22V18.5H9V15H14V11.5H20V22H4ZM16.1 3.3L17.5 2V7"/>
    </svg>
  )
}
