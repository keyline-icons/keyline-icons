import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Guesthouse({ size = 24, ...props }: IconProps) {
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
      <path d="M3.998 2V4.8M3.998 4.8V17H19.998V3.2M22.928 3L19.998 3.2L3.998 4.8M3.998 4.8L1.098 5.09M9.998 17V14C9.998 12.9 10.894 12 11.998 12C13.103 12 13.998 12.9 13.998 14V17M8.998 21H14.998"/>
      <path d="M9 9C9 9.55 8.552 10 8 10C7.448 10 7 9.55 7 9C7 8.45 7.448 8 8 8C8.552 8 9 8.45 9 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
