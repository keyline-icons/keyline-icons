import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Rainbow({ size = 24, ...props }: IconProps) {
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
      <path d="M2 19V15C2 9.477 6.4772 5 12 5C17.5228 5 22 9.477 22 15V19M6 19V15C6 11.686 8.6863 9 12 9C15.3137 9 18 11.686 18 15V19M10 19V15C10 13.895 10.8954 13 12 13C13.1046 13 14 13.895 14 15V19"/>
    </svg>
  )
}
