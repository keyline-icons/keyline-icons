import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleSoda({ size = 24, ...props }: IconProps) {
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
      <path d="M8.5 4L8.5 5C8.5 6.5 11 7 11 9.5L11 12C11 13 10 13.5 10 14.5C10 15.5 11 16 11 17L11 22L3 22L3 17C3 16 4 15.5 4 14.5C4 13.5 3 13 3 12L3 9.5C3 7 5.5 6.5 5.5 5L5.5 4M20.9995 10.0698L18.5 10L14.9091 10L16 22L20 22ZM18.5 10L20 6.5L20.2597 5.8939M5 4L5 2L9 2L9 4Z" fill="none"/>
    </svg>
  )
}
