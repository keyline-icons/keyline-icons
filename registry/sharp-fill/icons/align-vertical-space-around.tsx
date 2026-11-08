import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalSpaceAround({ size = 24, ...props }: IconProps) {
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
      <path d="M23 19V21H1V19H23ZM17 8C17.552 8 18 8.448 18 9V15C18 15.552 17.552 16 17 16H7C6.448 16 6 15.552 6 15V9C6 8.448 6.448 8 7 8H17ZM23 3V5H1V3H23Z" fill="currentColor"/>
    </svg>
  )
}
