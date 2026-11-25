import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Kerning({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14L3.7857 9L6.0583 2.668C6.3743 1.783 7.6257 1.783 7.9417 2.668L10.2143 9L12 14M10.2143 9H3.7857M13 2L16.6525 13.332C16.9369 14.217 18.0631 14.217 18.3475 13.332L22 2M7 20H17M9 18L7 20L9 22M15 18L17 20L15 22"/>
    </svg>
  )
}
