import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Parasol({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 14C2 11.5 3.75 9.25 5.875 7.25C8 5.25 10.5 3.5 12 2C13.5 3.5 16 5.25 18.125 7.25C20.25 9.25 22 11.5 22 14C20.75 12 18.25 12 17 14C15.75 12 13.25 12 12 14C10.75 12 8.25 12 7 14C5.75 12 3.25 12 2 14ZM12 14L12 23"/>
    </svg>
  )
}
