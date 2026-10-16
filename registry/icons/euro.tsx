import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Euro({ size = 24, ...props }: IconProps) {
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
      <path d="M21 20C19.269 21.2982 17.1637 22 15 22C9.4772 22 5 17.5228 5 12C5 6.4772 9.4772 2 15 2C17.1637 2 19.269 2.7018 21 4M3 10L17 10M3 14L17 14" fill="none"/>
    </svg>
  )
}
